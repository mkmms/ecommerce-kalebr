import React, { Component } from 'react';

class Checkout extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  handleSubmit(e){
    e.preventDefault()
    
    this.props.confirmOrder(this.refs.code.value.trim() )
  }

  render(){
    if( !this.props.isCheckout ) return false;

    return (
      <div className="container">
        <div className="text-center p-5">
          <h4>Verify your Mobile Number to confirm your order</h4>
          
          <form className="form-inline mt-5 justify-content-center" onSubmit={ this.handleSubmit.bind(this) }>
            <input 
              className="form-control mr-sm-2" 
              type="number" 
              placeholder="OTP"
              ref="code"
              min="100000"
              max="999999"
              required
            />
            <button 
              className="btn btn-outline-success my-2 my-sm-0 mr-2" 
              type="submit"
            >
              Confirm OTP
            </button>

            <button 
              className="btn btn-outline-danger my-2 my-sm-0" 
              type="button"
            >
              Resnd OTP
            </button>
          </form>

          <button 
            className="btn btn-warning mt-5" 
            onClick={ () => this.props.back() }
          >
            Back to Cart
          </button>
        </div>
      </div>
    )
  }
}

export default Checkout;