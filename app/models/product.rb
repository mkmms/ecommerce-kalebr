class Product < ApplicationRecord
  belongs_to :category
  mount_uploader :image, ProductUploader
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  # validates :slug, presence: true, uniqueness: { case_sensitive: false }
  validates :price, presence: true
  validates :category, presence: true

  extend FriendlyId
  friendly_id :title, use: :slugged
end
