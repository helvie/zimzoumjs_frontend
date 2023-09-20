import React from 'react';

////////////////////////////////////////////////////////////////////////////////

const ModalImage = ({ imageUrl, onClose }) => {

////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="modal">
      <div className="modal-content">
      <span className="close" style={{color:"#cc5500", fontSize:"50px", fontWeight:"bold", cursor:"pointer"}} onClick={onClose}>&times;</span>
        <img src={imageUrl} alt="Image" />
      </div>
    </div>
  );
};

export default ModalImage;