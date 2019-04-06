class HomeController < ApplicationController
  def index
    @products = Product.all
  end

  def add_to_cart
    @product = Product.where("id = #{params[:id]} and quantity >= #{params[:quantity]}").first
    if @product.present?
      @cart = Cart.new(@cart)
      @cart.add_item_to_cart(@product, params[:quantity].to_i)
      session[:cart] = @cart
      return render json: @cart.to_json
    else
      return render json: {message: "Out of Stock"}.to_json, status: :unprocessable_entity
    end
  end

  def cart
  end

  def checkout
  end
end
