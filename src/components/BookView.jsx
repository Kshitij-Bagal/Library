import React from "react";
import "../styles/BookView.css";

const BookView = ({ pdfUrl }) => {
  if (!pdfUrl) {
    return <p className="error-text">No PDF available.</p>;
  }

  const fileId = extractFileId(pdfUrl);
  if (!fileId) {
    return <p className="error-text">Invalid PDF URL.</p>;
  }

  console.log("Google Drive File ID:", fileId);

  return (
    <div className="book-view-container">
      <iframe 
        src={`https://drive.google.com/file/d/${fileId}/preview`} 
        width="100%" 
        height="600px" 
        allow="autoplay"
      ></iframe>
    </div>
  );
};

const extractFileId = (url) => {
  const match = url.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

export default BookView;
