import React from 'react';

const Categories = ({ categories, activeCategory }) => {

  let isDefaultActive = !activeCategory;

  return (
    <div className="">
      <ul className="categories text-center">
        <a  
          className={ `btn btn-outline-danger mr-3 rounded-pill ${isDefaultActive ? "active" : ""}`}
          href={ `/` }
        >
          All
        </a>
        {
          categories.map((category) => {
            let activeClass = activeCategory && activeCategory.id == category.id ? "active" : "";

            return (
              <a  
                className={ `btn btn-outline-danger mr-3 rounded-pill ${activeClass}`}
                key={category.id}
                href={ `/category/${category.slug}` }
              >
                {category.title}
              </a>
            )
          })
        }
      </ul>
    </div>
  )
}


export default Categories;