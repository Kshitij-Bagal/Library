import React from "react";
import Book from "./Book";

const BookList = ({ books }) => {
  // console.log("Rendering BookList with books:", books);

  if (!books || books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
