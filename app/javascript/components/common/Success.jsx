import React from 'react';
import PropTypes from 'prop-types';


const Success = ({message, onClose}) => {
  if( message.length == 0 ) return false;

  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert">
      { message }
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

Success.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func
}

export default Success;