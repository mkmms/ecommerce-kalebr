import React from "react"
import PropTypes from "prop-types"
import api from '../../axios.instance';
import Errors from "../common/Errors";

class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			cart: this.props.cart,
			errors: null
		}
	}

	handleOnClick(){
		alert("Clicked!!!")
	}

	addTocart(product){
		api.post(`/shop/add-to-cart`, {
			id: product.id,
			quantity: 1
		}).then( ({data}) => {
			
		}).catch( ({data}) => {
			
		})
	}

  render () {

		if( this.props.products.length == 0 ) {
			return (
				<div>
					No Products Available
				</div>
			)
		}

    return (
			<div className="album py-5 bg-light">
				<div className="container">
				
					<Errors 
						errors={this.state.errors}
            onClose={ () => this.setState({ errors: null }) }
					/>

					<div className="row">
						{
							this.props.products.map( (product) => {
								return (
									<div className="col-md-4" kwy={product.id}>
										<div className="card mb-4 shadow-sm">
											<img 
												src={product.image.url} 
												className="card-img-top"
												style={{ width: '260px' }}
											/>
											<div className="card-body">
												<p className="card-text">{product.description}</p>
												<div className="d-flex justify-content-between align-items-center">
													<div className="btn-group">
														<button type="button" className="btn btn-sm btn-outline-secondary">Rs. {product.price}</button>
														<button type="button" className="btn btn-sm btn-outline-secondary" onClick={ this.addTocart.bind(this, product) }>Cart</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								)
							})
						}
		      </div>
		    </div>
		  </div>
    );
  }
}

export default Home
