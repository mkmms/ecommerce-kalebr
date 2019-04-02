import React, { Component } from 'react';

class Categories extends Component{
  render(){
    const categories = this.props.categories ? this.props.categories : []

    return (
      <div className="container">
        <h1 className="display-5">Categories</h1>

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
                    <td>category.slug</td>
                    <td>Actions</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Categories;
