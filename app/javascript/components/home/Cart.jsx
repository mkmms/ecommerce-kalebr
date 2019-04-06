import React, { Component } from 'react';
import {
  TiEdit,
  TiTrash
} from 'react-icons/ti';

import api from '../../axios.instance';

class Cart extends Component{
  constructor(props){
    super(props)
    this.state = {
      cart: []
    }
  }
  
  componentDidMount(){
    this.setState({
      cart: this.props.cart
    })
  }

  render(){
    const cart = this.state.cart ? this.state.cart : []

    return (
      <div className="container">
        <h1 className="row m-0 mb-3 display-5 justify-content-between flex-row">
          <span>Cart</span>
          <a className="btn btn-primary" href="/checkout">Checkout</a>
        </h1>

        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img 
                        src={product.url} 
                        className="card-img-top"
                        style={{ width: '260px' }}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>Rs. {product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Cart;
