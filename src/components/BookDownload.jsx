import React from "react";

const BookDownload = ({ bookUrl }) => {
  return (
    <div>
      <a href={bookUrl} download>
        <button>Download Book</button>
      </a>
    </div>
  );
};

export default BookDownload;
