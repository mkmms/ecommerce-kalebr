import React from "react"
import api from '../../axios.instance';
import Errors from "../common/Errors";
import Categories from "./Categories";
import Products from "./Products";
import Success from "../common/Success";

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			cart: props.cart || [],
			errors: null,
			message: ""
		}
	}

	addTocart(product){
		let self = this;
		api.post(`/shop/add-to-cart`, {
			id: product.id,
			quantity: 1
		}).then( ({data}) => {
			self.setState({
				message: "Product Added into Cart Successfully",
				cart: [
					...data.cart_items
				]
			})
		}).catch( ({response}) => {
			if( response.status == 401 ){
				window.location = "/users/sign_in"
			}

			if( response.status == 405 ){
				alert("Admin can not place the Order")
			}
		})
	}

	componentDidMount() {
		let self = this;
		setTimeout( () => {
			window.__updateCart(self.state.cart);
		},1000)
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		window.__updateCart(this.state.cart);
	}

	render () {

    return (
			<div className="container">
				<div className="text-center p-3">
					<h2>Check out what's new</h2>
					<p>Latest PDF's and Illustrations we have to offer</p>
				</div>

				<Categories 
					categories={ this.props.categories }
					activeCategory={this.props.category}
				/>	

				<div className="pt-4">
					<Errors 
						errors={this.state.errors}
						onClose={ () => this.setState({ errors: null }) }
					/>
					<Success 
						message={this.state.message}
						onClose={ () => this.setState({ message: "" }) }
					/>
					<Products 
						products={this.props.products}
						addTocart={ (product) => this.addTocart(product) }
						isAdmin={this.props.is_admin}
					/>
				</div>
		  </div>
    );
  }
}

export default Home
