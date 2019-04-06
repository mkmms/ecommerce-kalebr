class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :get_cart
  layout :set_layout

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :mobile, :role])
  end

  def get_cart
    @cart = session[:cart].present? ? session[:cart]["cart_items"] : []
  end

  def set_layout
    if devise_controller?
      "auth"
    else
      "application"
    end
  end

end
