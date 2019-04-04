json.extract! product, :id, :title, :slug, :description, :category_id, :price, :image, :created_at, :updated_at
json.url product_url(product, format: :json)
