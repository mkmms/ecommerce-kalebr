import React, { Component } from 'react';
import {
  Modal
} from 'react-bootstrap';
import api from '../../axios.instance';

class AddCategory extends Component{

  state={
    title: "",
    slug: ""
  }

  handleClose(){
    this.props.onCloseCategory()
  }

  handleSubmit(e){
    e.preventDefault()
    api.post('/categories.json', {
      category: {
        title: this.refs.title.value.trim(),
        slug: this.refs.title.value.trim()
      }
    }).then((res) => {
      this.props.onSave(res.data);
      this.props.onCloseCategory();
    }).catch( (err) => {
      debugger;
    })
  }

  render(){
    return (
      <Modal 
        show={this.props.isOpened} 
        onHide={this.handleClose.bind(this)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={ this.handleSubmit.bind(this) }>    
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Category Title" 
                aria-describedby="titleHelp"
                ref="title"
                required
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