import React from 'react';

////////////////////////////////////////////////////////////////////////////////

const ModalPDF = ({ pdfUrl, onClose }) => {

////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="modal">
      <div className="modal-content">
      <span className="close" style={{color:"#cc5500", fontSize:"50px", fontWeight:"bold", cursor:"pointer"}} onClick={onClose}>&times;</span>
        <iframe src={pdfUrl} width="100%" height="500px" frameborder="0"></iframe>
      </div>
    </div>
  );
};

export default ModalPDF;