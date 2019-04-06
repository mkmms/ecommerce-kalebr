class HomeController < ApplicationController
  def index
    @products = Product.all
  end

  def add_to_cart
    @product = Product.find(params[:id])
    if @product.present?
      @cart = Cart.new(@cart)
      @cart.add_item_to_cart(@product)
      session[:cart] = @cart
      return render json: @cart.to_json
    else
      return render json: {message: "Out of Stock"}.to_json, status: :unprocessable_entity
    end
  end

  def clear_from_cart
    @cart = Cart.new(@cart)
    unless @cart.is_cart_empty?
      if params[:is_all].present?
        @cart = Cart.new
      else
        @cart.remove_item_from_cart(params[:id])
      end
      session[:cart] = @cart
    end
    return render json: @cart.to_json
  end

  def cart
  end

  def checkout
    if @cart.present?
      order = Order.new
      order.user_id = current_user.id
      order.product_id = @cart.first["id"]
      order.price = @cart.reduce(0){|a, b| a + b["price"] }
      order.status = Order::PENDING
      if order.save
        ConfirmationSender.send_confirmation_to(current_user, order)
        return render json: order.to_json, status: :ok
      else
        return render json: order.errors, status: :unprocessable_entity
      end
    end
  end

  def confirm_order
    order = Order.where(id: params[:id], verification_code: params[:verification_code]).first
    if order.present?
      order.update(status: Order::CONFIRMED)
      session[:cart] = Cart.new
      return render json: "Ordered Successfully!", status: :ok
    else
      return render json: "Order Not Found", status: :unprocessable_entity
    end
  end

  def my_orders
    orders = current_user.orders.includes(:product).where(status: Order::CONFIRMED)
    @orders = orders.map{|order| 
      order
        .as_json
        .merge(order.product.as_json)
        .merge({ order_id: order.id })
    }
  end
end
