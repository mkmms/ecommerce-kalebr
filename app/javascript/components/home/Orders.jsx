import React, { Component } from 'react';

class Orders extends Component{
  constructor(props){
    super(props)
    this.state = {
      orders: []
    }
  }
  
  componentDidMount(){
    this.setState({
      orders: this.props.orders
    })
  }

  render(){
    const orders = this.state.orders ? this.state.orders : []

    if( orders.length == 0 ) {
      return (
        <div className="container">
          <div className="p-5 text-center">
            <h4>You have not Ordered</h4>
            <p>
              Please choose Product from <a href="/">here</a>.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="container">
        <h1 className="row m-0 mb-3 mt-3 display-5 justify-content-between flex-row">
          <span>Orders</span>
        </h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img 
                        src={product.image.url} 
                        className="card-img-top cart-img"
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>Rs. {product.price}</td>
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

export default Orders;
