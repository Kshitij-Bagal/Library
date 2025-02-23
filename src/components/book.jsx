import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, selectFavoriteBooks  } from "../redux/favoritesSlice";


const Book = ({ book }) => {
  const GITHUB_IMAGE_BASE_URL = "https://raw.githubusercontent.com/Kshitij-Bagal/Library-images/main/";
  const DEFAULT_IMAGE_URL = `${GITHUB_IMAGE_BASE_URL}link_to_image_.png`; // Fallback image
  const [imageUrl, setImageUrl] = useState(`${GITHUB_IMAGE_BASE_URL}${encodeURIComponent(book.name)}.jpg`);
  const [attemptedPng, setAttemptedPng] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteBooks);
  const isFavorite = favorites.some((fav) => fav.id === book.id);

  const handleImageError = () => {
    if (!attemptedPng) {
      // First failure → Try .png
      setImageUrl(`${GITHUB_IMAGE_BASE_URL}${encodeURIComponent(book.name)}.png`);
      setAttemptedPng(true);
    } else {
      // Second failure → Use default fallback image
      setImageUrl(DEFAULT_IMAGE_URL);
    }
  };
  
  if (!book) {
    return <div>Book data is missing!</div>;
  }
  
  const handleViewDetails = async (book) => {
    const bookname = book.name; // Handle both cases
  
    if (!bookname) {
      console.error("Book ID is missing:", book);
      return;
    }
  
    try {
      await fetch(`https://library-backend-vi4b.onrender.com/api/books/${bookname}/increment-visit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      });
      console.log(`Visit count increased for: ${book.name}`);
    } catch (error) {
      console.error("Failed to update visit count:", error);
    }
  };
  
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(book.id));
      console.log("Removed from favorites:", book.name);
    } else {
      dispatch(addFavorite(book));
      console.log("Added to favorites:", book.name);
    }
  };

  return (
    <div className="book-card">
      <img
        src={imageUrl}
        alt={book.name || "Book Cover"}
        className="book-cover"
        onError={handleImageError} // Auto-switch between jpg → png → fallback
      />
      <div className="book-info">
        <h3>{book.name || "Untitled"}</h3>
        <p><strong>Author:</strong> {book.author || "Unknown"}</p>
        <p><strong>Genre:</strong> {book.genre || "Not specified"}</p>
        <p><strong>Published:</strong> {book.publishDate || "N/A"}</p>
        <Link to={`/Library/book/${book.name}`} onClick={() => handleViewDetails(book)} className="details-btn">
          📖 View Details
        </Link>
        <button className='fav-btn' onClick={toggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      </div>
    </div>
  );
};

export default Book;
