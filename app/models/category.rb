class Category < ApplicationRecord
  acts_as_paranoid
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  validates :slug, presence: true, uniqueness: { case_sensitive: false }
  has_many :products
  before_save :update_slug

  def update_slug
    self.slug = self.slug.parameterize
  end
end
