class Product < ApplicationRecord
  acts_as_paranoid
  belongs_to :category
  has_many :orders
  mount_uploader :image, ProductUploader
  mount_uploader :file, FileUploader
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  validates :slug, presence: true, uniqueness: { case_sensitive: false }
  validates :price, presence: true
  validates :category, presence: true

  before_save :update_slug

  def update_slug
    self.slug = self.slug.parameterize
  end
    
end
