import React, { Component } from 'react';
import {
  TiEdit,
  TiTrash
} from 'react-icons/ti';
import moment from 'moment';

import AddCategory from './AddCategory';
import api from '../../axios.instance';

class Categories extends Component{
  state ={
    isOpened: false,
    categories: [],
    categoryEditable: null
  }

  componentDidMount(){
    this.setState({
      categories: this.props.categories
    })
  }

  updateCategories(category){
    let categories = [...this.state.categories]

    categories = categories.filter( (cat) => cat.id !== category.id )

    categories.push(category);

    this.setState({
      categories,
      isOpened: false,
      categoryEditable: null
    })
  }

  editCategory(categoryEditable){
    this.setState({
      categoryEditable,
      isOpened: true
    })
  }

  deleteCategory(id){
    if( confirm("Are you sure to Delete Category?") ){
      api.delete(`/categories/${id}.json`)
        .then((res) => {
          let categories = [...this.state.categories]

          categories = categories.filter( (cat) => cat.id !== id )

          this.setState({
            categories
          })
        }).catch( (err) => {
          console.log(err)
        })
    }
  }

  render(){
    const categories = this.state.categories ? this.state.categories : []

    return (
      <div className="container">
        <h1 className="row m-0 mb-3 display-5 justify-content-between flex-row">
          <span>Categories</span>
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
              <th>Category</th>
              <th>Slug</th>
              <th>Created On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map((category, index) => {
                return (
                  <tr key={index}>
                    <td>{category.title}</td>
                    <td>{category.slug}</td>
                    <td>{moment(category.created_at).format("DD/MM/YYYY hh:mm a")}</td>
                    <td>
                      <button 
                        className="btn btn-link mr-3"
                        onClick={ this.editCategory.bind(this, category.id) }
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        <TiEdit size={'2em'}/>
                      </button>
                      <button 
                        className="btn btn-link"
                        onClick={ this.deleteCategory.bind(this, category.id) }
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
        <AddCategory
          isOpened={this.state.isOpened}
          onCloseCategory={ () => this.setState({ isOpened: false }) }
          onSave={ (data) => this.updateCategories(data) }
          categoryEditable={ this.state.categoryEditable }
          categories={ this.state.categories }
        />
      </div>
    )
  }
}

export default Categories;
