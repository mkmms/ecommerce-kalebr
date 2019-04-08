class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  enum role: [:user, :admin]
  after_initialize :set_default_role, :if => :new_record?
  has_many :orders

  # Constants
  ADMIN = 1
  USER = 2

  # Methods
  def set_default_role
    self.role ||= :user
  end
end
