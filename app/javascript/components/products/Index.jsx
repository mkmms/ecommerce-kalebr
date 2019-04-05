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
    categories: [],
    productEditable: null
  }

  componentDidMount(){
    this.setState({
      products: this.props.products,
      categories: this.props.categories
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

        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img 
                        src={product.image.url} 
                        className="card-img-top"
                        style={{ width: '260px' }}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>Rs. {product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <button 
                        className="btn btn-link mr-3"
                        onClick={ this.editProduct.bind(this, product.id) }
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        <TiEdit size={'2em'}/>
                      </button>
                      <button 
                        className="btn btn-link"
                        onClick={ this.deleteProduct.bind(this, product.id) }
                        style={{
                          color: 'red',
                          cursor: 'pointer'
                        }}
                      >
                        <TiTrash size={'2em'}/>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <AddProduct
          isOpened={this.state.isOpened}
          onCloseProduct={ () => this.setState({ isOpened: false }) }
          onSave={ (data) => this.updateProducts(data) }
          productEditable={ this.state.productEditable }
          products={ this.state.products }
          categories={ this.state.categories }
        />
      </div>
    )
  }
}

export default Products;
