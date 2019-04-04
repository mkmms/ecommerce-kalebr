import React, { Component } from 'react';
import {
  TiEdit,
  TiTrash
} from 'react-icons/ti';
import moment from 'moment';

import AddProduct from './AddProduct';
import api from '../../axios.instance';

class Products extends Component{
  state ={
    isOpened: false,
    products: [],
    productEditable: null
  }

  componentDidMount(){
    this.setState({
      products: this.props.products
    })
  }

  updateProducts(product){
    let products = [...this.state.products]

    products = products.filter( (cat) => cat.id !== product.id )

    products.push(product);

    this.setState({
      products,
      isOpened: false,
      productEditable: null
    })
  }

  editProduct(productEditable){
    this.setState({
      productEditable,
      isOpened: true
    })
  }

  deleteProduct(id){
    if( confirm("Are you sure to Delete Product?") ){
      api.delete(`/products/${id}.json`)
        .then((res) => {
          let products = [...this.state.products]

          products = products.filter( (product) => product.id !== id )

          this.setState({
            products
          })
        }).catch( (err) => {
          console.log(err)
        })
    }
  }

  render(){
    const products = this.state.products ? this.state.products : []

    return (
      <div className="container">
        <h1 className="row m-0 mb-3 display-5 justify-content-between flex-row">
          <span>Products</span>
          <button 
            className="btn btn-primary"
            onClick={ () => this.setState({ isOpened: true }) }
          >
            Create
          </button>
        </h1>

        <div className="row">  
          {
            products.map((product, index) => {
              return (
                <div className="col-sm-4" key={index}>
                  <div className="card" style={{width: "18rem"}}>
                    <img 
                      src={product.image.url} 
                      className="card-img-top"
                      style={{ minHeight: '260px' }}>
                    </img>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                      <button className="btn btn-primary">{product.price}</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <AddProduct
          isOpened={this.state.isOpened}
          onCloseProduct={ () => this.setState({ isOpened: false }) }
          onSave={ (data) => this.updateProducts(data) }
          productEditable={ this.state.productEditable }
          products={ this.state.products }
        />
      </div>
    )
  }
}

export default Products;
