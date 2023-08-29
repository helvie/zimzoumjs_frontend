import React from 'react';
import { Document, Page } from 'react-pdf';

const ModalPDF = ({ pdfUrl, onClose }) => {
            console.log(pdfUrl)
  return (
    <div className="modal">
      <div className="modal-content">
      <span className="close" style={{color:"#cc5500", fontSize:"50px", fontWeight:"bold", cursor:"pointer"}} onClick={onClose}>&times;</span>
        <iframe src={pdfUrl} width="100%" height="500px" frameborder="0"></iframe>
        {/* <Document file={pdfUrl}>
          <Page pageNumber={1} />
        </Document> */}
      </div>
    </div>
  );
};

export default ModalPDF;