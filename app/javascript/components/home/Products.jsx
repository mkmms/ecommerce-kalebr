import React from 'react';
import Product from './Product';

const Products = ({ products, addTocart, isAdmin }) => {
  if( products.length == 0 ){
    return (
      <div className="p-5">
        <h4>No Products Available</h4>
      </div>
    )
  }

  return (
    <div className="row">
      {
        products.map( (product) => {
          return (
            <div className="col-md-3" key={product.id}>
              <Product 
                product={ product }
                addToCart={(product) => addTocart(product) }
                isAdmin={isAdmin}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default Products