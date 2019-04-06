Rails.application.routes.draw do
  resources :products
  resources :categories
  devise_for :users
  get 'home/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "home#index"
  post "/shop/add-to-cart", to: "home#add_to_cart"
  get "/cart", to: "home#cart"
  get "/checkout", to: "home#checkout"
end
