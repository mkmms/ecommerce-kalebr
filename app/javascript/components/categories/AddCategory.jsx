import React, { Component } from 'react';
import {
  Modal
} from 'react-bootstrap';
import api from '../../axios.instance';
import Errors from '../common/Errors';

class AddCategory extends Component{

  state={
    title: "",
    slug: "",
    errors: null
  }

  handleClose(){
    this.props.onCloseCategory()
  }

  handleSubmit(e){
    e.preventDefault()

    let urlEndPoint = !!this.props.categoryEditable 
      ? `/categories/${this.props.categoryEditable}.json` 
      : '/categories.json';

    let method = !!this.props.categoryEditable ? "patch" : "post"

    api[method](urlEndPoint, {
      category: {
        title: this.refs.title.value.trim(),
        slug: this.refs.title.value.trim()
      }
    }).then((res) => {
      this.props.onSave(res.data);
      this.props.onCloseCategory();
      this.refs.categoryForm.reset();
    }).catch( (err) => {
      this.refs.categoryForm.reset();
      this.setState({
        errors: err.response.data
      })
    })

  }

  render(){
    let {
      categoryEditable,
      categories
    } = this.props;

    let category = !!categoryEditable 
      ? categories
        .filter((cat) => categoryEditable === cat.id)[0]
      : {};

    return (
      <Modal 
        show={this.props.isOpened} 
        onHide={this.handleClose.bind(this)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            { !!categoryEditable ? 'Edit Category' : 'Create Category' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Errors 
            errors={this.state.errors}
            onClose={ () => this.setState({ errors: null }) }
          />

          <form ref="categoryForm" onSubmit={ this.handleSubmit.bind(this) }>    
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Category Title" 
                aria-describedby="titleHelp"
                ref="title"
                required
                defaultValue={ category.title }
              />
              <small 
                id="titleHelp" 
                className="form-text text-muted"
              >Enter Category Title</small>
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
                defaultValue={ category.slug }
              />
              <small 
                id="slugHelp" 
                className="form-text text-muted"
              >
                Enter Category Slug
              </small>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>

        </Modal.Body>
      </Modal>
    )
  }
}

export default AddCategory;