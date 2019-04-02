import React, { Component, Fragment } from 'react';

const LoggedIn = ({
  isAdmin,
  isLoggedIn
}) => {

  if( !isLoggedIn ) return false;

  return (
    <Fragment>
      {
        isAdmin ? (
          <Fragment>
            <a className="p-2 text-dark" href="/producs">Products</a>
            <a className="p-2 text-dark" href="/categories">Categories</a>
          </Fragment>
        ) : null
      }

      {
        !isAdmin ? (
          <Fragment>
            <a className="p-2 text-dark" href="/cart">Cart</a>
            <a className="p-2 text-dark" href="/myself">My Orders</a>
          </Fragment>
        ) : null
      }
      <a className="mr-2 btn btn-outline-primary" data-method="delete" href="/users/sign_out">Logout</a>
    </Fragment>
  )
}

const LoggedOut = ({isLoggedIn}) => {
  if( isLoggedIn ) return false;

  return (
    <Fragment>
      <a className="mr-2 btn btn-outline-primary" href="/users/sign_up">Sign up</a>
      <a className="btn btn-outline-primary" href="/users/sign_in">Sign in</a>
    </Fragment>
  )
}

class Header extends Component{
  render(){
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">Test</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="/">Home</a>
          <LoggedIn
            isLoggedIn={this.props.auth.isLoggedIn}
            isAdmin={this.props.auth.isAdmin}
          />
        </nav>
        <LoggedOut
          isLoggedIn={this.props.auth.isLoggedIn}
        />
      </div>
    )
  }
}

export default Header
