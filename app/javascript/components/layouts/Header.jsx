import React, { Component, Fragment } from 'react';
import Logo from '../../logo.png';

const LoggedIn = ({
  isAdmin,
  isLoggedIn,
  cart
}) => {

  if( !isLoggedIn ) return false;

  let cartIcon = 0
  if( !!cart ){
    cartIcon = cart.length
  }

  return (
    <Fragment>
      {
        isAdmin ? (
          <Fragment>
            <a className="p-2 text-dark" href="/products">Products</a>
            <a className="p-2 text-dark" href="/categories">Categories</a>
          </Fragment>
        ) : null
      }

      {
        !isAdmin ? (
          <Fragment>
            <a className="p-2 text-dark" href="/cart">
              Cart
              ({cartIcon})
            </a>
            <a className="p-2 text-dark" href="/my_orders">My Orders</a>
          </Fragment>
        ) : null
      }
      <a className="ml-3 btn btn-outline-danger" data-method="delete" href="/users/sign_out">Logout</a>
    </Fragment>
  )
}

const LoggedOut = ({isLoggedIn}) => {
  if( isLoggedIn ) return false;

  return (
    <Fragment>
      <a className="mr-2 btn btn-outline-danger" href="/users/sign_up">Sign up</a>
      <a className="btn btn-outline-danger" href="/users/sign_in">Sign in</a>
    </Fragment>
  )
}

class Header extends Component{
  render(){
    return (
      <div className="p-3 px-md-4 bg-white border-bottom shadow-sm">
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-center ">
            <h5 className="my-0 mr-md-auto font-weight-normal">
              <a className="p-2 text-dark" href="/">
                <img src={Logo} style={{ maxWidth: '200px' }}/>
              </a>
            </h5>
            <nav className="my-2 my-md-0 mr-md-3">
              <LoggedIn
                isLoggedIn={this.props.auth.isLoggedIn}
                isAdmin={this.props.auth.isAdmin}
                cart={this.props.cart}
              />
            </nav>
            <LoggedOut
              isLoggedIn={this.props.auth.isLoggedIn}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Header
