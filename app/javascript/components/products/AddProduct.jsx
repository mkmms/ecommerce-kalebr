import React, { Component } from 'react';
import {
  Modal
} from 'react-bootstrap';
import api from '../../axios.instance';
import Errors from '../common/Errors';

class AddProduct extends Component{

  state={
    title: "",
    slug: "",
    errors: null
  }

  handleClose(){
    this.props.onCloseProduct()
  }

  handleSubmit(e){
    e.preventDefault()

    let urlEndPoint = !!this.props.productEditable 
      ? `/products/${this.props.productEditable}.json` 
      : '/products.json';

    let method = !!this.props.productEditable ? "patch" : "post"

    api[method](urlEndPoint, {
      product: {
        title: this.refs.title.value.trim(),
        slug: this.refs.title.value.trim()
      }
    }).then((res) => {
      this.props.onSave(res.data);
      this.props.onCloseProduct();
      this.refs.productForm.reset();
    }).catch( (err) => {
      this.refs.productForm.reset();
      this.setState({
        errors: err.response.data
      })
    })

  }

  render(){
    let {
      productEditable,
      products
    } = this.props;

    let product = !!productEditable 
      ? products
        .filter((pr) => productEditable === pr.id)[0]
      : {};

    return (
      <Modal 
        show={this.props.isOpened} 
        onHide={this.handleClose.bind(this)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            { !!productEditable ? 'Edit Product' : 'Create Product' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Errors 
            errors={this.state.errors}
            onClose={ () => this.setState({ errors: null }) }
          />

          <form ref="productForm" onSubmit={ this.handleSubmit.bind(this) }>    
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Product Name" 
                aria-describedby="titleHelp"
                ref="title"
                required
                defaultValue={ product.title }
              />
              <small 
                id="titleHelp" 
                className="form-text text-muted"
              >Product Title</small>
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Category Slug" 
                aria-describedby="slugHelp"
                ref="slug"
                required
                defaultValue={ product.slug }
              />
              <small 
                id="slugHelp" 
                className="form-text text-muted"
              >
                Product Slug
              </small>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea 
                className="form-control" 
                placeholder="Product Description" 
                ref="description"
                rows={4}
              >
                { product.description }
              </textarea>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select 
                className="form-control" 
                ref="category"
                required
                rows={4}
                defaultValue={ product.category }
              >
                {
                  
                }
              </select>
            </div>

            <div className="form-group">
              <label>Price</label>
              <input 
                type="text"
                className="form-control" 
                ref="price"
                required
                defaultValue={ product.price }
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
            >
              Create Product
            </button>
          </form>

        </Modal.Body>
      </Modal>
    )
  }
}

export default AddProduct;