import React from 'react';
import PropTypes from 'prop-types';


const Errors = ({errors, onClose}) => {

  if( !errors ) return false;

  let errorsList = []

  if( Object.keys(errors) ){
    for( let key in errors ){
      errorsList = [ 
        ...errorsList,
        ...errors[key].map((err) => `${key} ${err}` )
      ]
    }
  }

  if( Array.isArray(errors) ){
    errorsList = [
      ...errors
    ]
  }

  if( typeof errors == "string" ){
    errorsList = [
      errors
    ]
  }

  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <ul className="m-0">
        {
          errorsList.map( (err, index) =>  <li key={index}>{err}</li> )
        }
      </ul>
      <button 
        type="button" 
        className="close" 
        data-dismiss="alert" 
        aria-label="Close"
        onClick={ () => onClose() }
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

Errors.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  onClose: PropTypes.func
}

export default Errors;