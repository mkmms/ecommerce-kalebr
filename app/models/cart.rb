class Cart
  attr_accessor :cart_items

  def initialize(cart_items = [])
    @cart_items = cart_items
  end

  def is_cart_empty?
    @cart_items.blank?
  end

  def add_item_to_cart(product, quantity)
    cart_item = @cart_items.select { |item| item["id"] == product.id }.first
    if cart_item.present?
      cart_item["quantity"] = cart_item["quantity"] + quantity
      @cart_items = @cart_items.select { |item| item["id"] != product.id }
      @cart_items << cart_item
    else
      @cart_items << {
        id: product.id,
        title: product.title,
        url: product.image.url,
        price: product.price,
        quantity: quantity
    }.as_json
    end
  end

  def remove_item_from_cart(id)
    @cart_items = @cart_items.select { |item| item["id"] != id }
  end
end