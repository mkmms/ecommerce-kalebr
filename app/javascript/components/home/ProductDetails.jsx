import React, { Component } from 'react';
import api from '../../axios.instance';

class ProductDetails extends Component{
  constructor(props){
    super(props);
	  this.state = {
    	cart: props.cart
	  }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
	  window.__updateCart(this.state.cart);
  }

	addToCart(){
    let self = this;
    let {
      product
    } = this.props;

		api.post(`/shop/add-to-cart`, {
			id: product.id,
			quantity: 1
		}).then( ({data}) => {
			self.setState({
				message: "Product Added into Cart Successfully",
				cart: data.cart_items
      });
      
      window.location = "/cart"
		}).catch( ({response}) => {
			if( response.status == 401 ){
				window.location = "/users/sign_in"
			}

			if( response.status == 405 ){
				alert("Admin can not place the Order")
			}
		})
  }

  render(){
    let {
      product
    } = this.props;

    return (
      <div className="container pt-4">
        <div className="row product-details">
          <div className="col-sm-6">
            <div className="product-img">
              <img src={product.image.url} style={{ maxWidth: '500px' }}/>
            </div>
          </div>
          <div className="col-sm-6">
            <h4>{product.title}</h4>
            <hr/>
            <p>{product.description}</p>
            <hr/>
            <button 
              className="btn btn-primary rounded-pill"
              onClick={ this.addToCart.bind(this) }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetails;