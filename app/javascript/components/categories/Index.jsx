import React, { Component } from 'react';

import AddCategory from './AddCategory';
import api from '../../axios.instance';

class Categories extends Component{
  state ={
    isOpened: false,
    categories: []
  }

  componentDidMount(){
    this.setState({
      categories: this.props.categories
    })
  }

  updateCategories(category){
    let categories = [...this.state.categories]

    categories.push(category);

    this.setState({
      categories
    })
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
                    <td></td>
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
        />
      </div>
    )
  }
}

export default Categories;
