class Order < ApplicationRecord
  belongs_to :user
  belongs_to :product

  PENDING = 1
  CONFIRMED = 2
end
