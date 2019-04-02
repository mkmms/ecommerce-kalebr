import React from "react"
import PropTypes from "prop-types"
class Home extends React.Component {
	handleOnClick(){
		alert("Clicked!!!")
	}

  render () {
    return (
      <React.Fragment>
      	<h1>Hello World</h1>
      	<button onClick={this.handleOnClick}>Click Me</button>
      </React.Fragment>
    );
  }
}

export default Home
