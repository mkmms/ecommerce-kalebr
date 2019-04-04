class Category < ApplicationRecord
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  validates :slug, presence: true, uniqueness: { case_sensitive: false }
  has_many :products
end
