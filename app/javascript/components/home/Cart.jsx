import React, {Component} from 'react';

import api from '../../axios.instance';
import Checkout from './Checkout';

class Cart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cart: [],
			isCheckout: false,
			order: null,
			orderConfirmed: false
		}
	}

	componentDidMount() {
		this.setState({
			cart: this.props.cart
		})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		window.__updateCart(this.state.cart);
	}

	clearCartItem(product, isAll = false) {
		api.post("/shop/clear-from-cart", {
			id: product.id,
			is_all: isAll
		}).then(({data}) => {
			this.setState({
				cart: data.cart_items
			})
		}).catch(({response}) => {

		})
	}

	checkoutOrder() {
		api.post("/checkout").then(({data}) => {
			this.setState({
				order: data,
				isCheckout: true
			})
		}).catch(({response}) => {

		})
	}

	confirmOrder(verification_code) {
		api.post("/confirm_order", {
			id: this.state.order.id,
			verification_code
		}).then(({data}) => {
			this.setState({
				order: data,
				orderConfirmed: true,
				isCheckout: false
			})
		}).catch(({response}) => {

		})
	}

	render() {
		const cart = this.state.cart ? this.state.cart : []

		if (this.state.orderConfirmed) {
			return (
				<div className="container">
					<div className="p-5 text-center">
						<h4>Your Order has been Confirmed</h4>
						<p>
							Thank you for shopping with us!
						</p>
					</div>
				</div>
			)
		}

		if (this.state.isCheckout) {
			return (
				<Checkout
					isCheckout={this.state.isCheckout}
					back={() => this.setState({isCheckout: false})}
					confirmOrder={(verification_code) => this.confirmOrder(verification_code)}
				/>
			)
		}

		if (cart.length == 0) {
			return (
				<div className="container">
					<div className="p-5 text-center">
						<h4>You have not added any Product into Cart</h4>
						<p>
							Please choose Product from <a href="/">here</a>.
						</p>
					</div>
				</div>
			)
		}

		let totalPrice = cart.reduce((initCharges, newCharge) => {
			return initCharges + newCharge.price
		}, 0)

		return (
			<div className="container mt-3">
				<h1 className="row m-0 mb-3 display-5 justify-content-between flex-row">
					<span>Cart</span>
				</h1>

				<div className="row">
					<div className="col-sm-8">
						<table className="table table-striped">
							<thead>
							<tr>
								<th>Image</th>
								<th>Title</th>
								<th></th>
								<th className="text-right">Price</th>
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
													className="card-img-top cart-img"
												/>
											</td>
											<td>{product.title}</td>
											<td>
												<button
													className="btn btn-link"
													onClick={this.clearCartItem.bind(this, product)}
												>Clear
												</button>
											</td>
											<td className="text-right">
												Rs. {product.price}
											</td>
										</tr>
									)
								})
							}
							<tr>
								<td colSpan={3}></td>
								<td className="text-right">Total: Rs. {totalPrice}</td>
							</tr>
							</tbody>
						</table>
					</div>
					<div className="col-sm-4">
						<div>
							<button
								className="btn btn-success mr-2 mb-2"
								onClick={this.checkoutOrder.bind(this)}
							>Checkout
							</button>
							<br/>
							<button
								className="btn btn-danger "
								onClick={this.clearCartItem.bind(this, {}, true)}
							>Clear Cart
							</button>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

export default Cart;
