import React from 'react';

const Product = ({
  product,
  addToCart,
  isAdmin
}) => {
  return (
    <div className="product">
      <div className="product-img">
        <img src={product.image.url}/>
      </div>
      <div className="product-content">
        <div className="product-title">
          <h4>{product.title}</h4>
        </div>
        <div className="product-price">
          Rs. {product.price}
        </div>
      </div>
      {
        !isAdmin ? (
          <div className="product-footer d-flex justify-content-between">
            <a 
              className="btn btn-outline-primary rounded-pill mr-4"
              href={`/shop/${product.slug}`}
            >
              view
            </a>
            <button 
              className="btn btn-outline-success rounded-pill"
              onClick={ () => addToCart(product) }
            >
              Add to Cart
            </button>
          </div>
        ) : null
      }
    </div>
  )
}

export default Product;