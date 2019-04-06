Rails.application.routes.draw do
  resources :products
  resources :categories
  devise_for :users
  get 'home/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "home#index"
  post "/shop/add-to-cart", to: "home#add_to_cart"
  post "/shop/clear-from-cart", to: "home#clear_from_cart"
  get "/cart", to: "home#cart"
  post "/checkout", to: "home#checkout"
  post "/confirm_order", to: "home#confirm_order"
  get "/my_orders", to: "home#my_orders"
end
