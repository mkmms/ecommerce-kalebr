class HomeController < ApplicationController
  before_action :verify_user, except: [:index, :product_by_category, :product]

  def index
    @products = Product.all
    @categories = Category.all
  end

  def product_by_category
    @categories = Category.all
    @category = Category.includes(:products).where(slug: params[:slug]).first
    @products = @category.products if @category.present?
  end

  def product
    @product = Product.includes(:category).where(slug: params[:slug]).first
    @category = @product.category if @product.present?
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
      order = Order.create_pending_order(@cart, current_user)
      unless order[:errors].present?
        return render json: order[:order].to_json, status: :ok
      else
        return render json: order[:errors], status: :unprocessable_entity
      end
    end
  end

  def confirm_order
    order = Order.where(id: params[:id], verification_code: params[:verification_code]).first
    if order.present?
      order.update(status: Order::CONFIRMED)
      session[:cart] = Cart.new
      ShopperMailer.send_product(current_user, order.product).deliver_now!
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

  private
  def verify_user
    if user_signed_in?
      if current_user.user?
        return true
      else
        return render json: {message: "Admin can not purchase!"}, status: 405
      end
    else
      return render json: { message: "Login to the Application to Purchase!" }, status: 401
    end
  end
end
