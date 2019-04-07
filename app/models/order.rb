class Order < ApplicationRecord
  belongs_to :user
  belongs_to :product

  PENDING = 1
  CONFIRMED = 2

  def self.create_pending_order(cart, user)
		order = Order.new
    order.user_id = user.id
    order.product_id = cart.first["id"]
    order.price = cart.reduce(0){|a, b| a + b["price"] }
    order.status = Order::PENDING
    if order.save
      ConfirmationSender.send_confirmation_to(user, order)
      return {
      	errors: nil, 
      	order: order
      }
    else
    	return {
      	errors: order.errors, 
      	order: nil
      }
    end
  end
end
