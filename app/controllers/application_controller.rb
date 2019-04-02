class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  layout :set_layout

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :mobile, :role])
  end

  def set_layout
    if devise_controller?
      "auth"
    else
      "application"
    end
  end

end
