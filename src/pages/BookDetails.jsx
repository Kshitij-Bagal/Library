import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BookView from "../components/BookView";
import "../styles/BookDetails.css";

const BookDetails = () => {
  const { name } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  const [rating, setRating] = useState(null);
  const [totalRatings, setTotalRatings] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const GITHUB_IMAGE_BASE_URL = "https://raw.githubusercontent.com/Kshitij-Bagal/Library-images/main/";
  const DEFAULT_IMAGE_URL = `${GITHUB_IMAGE_BASE_URL}link_to_image_.png`;

  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE_URL);
  const [attemptedPng, setAttemptedPng] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/books/${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error("Book not found");
        
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      }
    };


    const fetchRatings = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/books/${encodeURIComponent(name)}/ratings`);
        if (!res.ok) throw new Error("Failed to fetch ratings");

        const data = await res.json();
        setRating(data.avgRating);
        setTotalRatings(data.totalRatings);
      } catch (err) {
        console.error("Error fetching ratings:", err);
      }
    };

    fetchRatings();
    fetchBook();
  }, [name]);

    
  useEffect(() => {
    if (book) {
      setImageUrl(`${GITHUB_IMAGE_BASE_URL}${encodeURIComponent(book.name)}.jpg`);
    }
  }, [book]);

  const handleImageError = () => {
    if (!attemptedPng && book) {
      setImageUrl(`${GITHUB_IMAGE_BASE_URL}${encodeURIComponent(book.name)}.png`);
      setAttemptedPng(true);
    } else {
      setImageUrl(DEFAULT_IMAGE_URL);
    }
  };

  const handleDownload = async () => {
    if (!book?.pdfUrl) return;

    try {
      await fetch(`http://localhost:8000/api/books/${book.name}/increment-download`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      });
      console.log(`Download count increased for: ${book.name}`);
    } catch (error) {
      console.error("Failed to update download count:", error);
    }

    window.open(book.pdfUrl, "_blank");
  };

  const submitRating = async (rating) => {
    try {
      const res = await fetch(`http://localhost:8000/api/books/${encodeURIComponent(name)}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });

      if (!res.ok) throw new Error("Failed to submit rating");

      setUserRating(rating);
      setTotalRatings(totalRatings + 1);
      setRating(((rating + parseFloat(rating) * totalRatings) / (totalRatings + 1)).toFixed(1));
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!book) return <p className="text-center text-blue-500">Loading book...</p>;

  return (
    <>
    <div className="book-details-container">
      <div className="book-details-card">
        <img 
          src={imageUrl} 
          alt={book?.name || "Book cover"} 
          className="details-book-cover" 
          onError={handleImageError}
        />
        
        <div className="detailed-book-info">
          <h2>{book?.name || "Unknown Title"}</h2>
          <p><strong>Author:</strong> {book?.author || "Unknown"}</p>
          <p><strong>Genre:</strong> {book?.genre || "N/A"}</p>
          <p><strong>Published:</strong> {book?.publishDate || "N/A"}</p>
          <p><strong>Description:</strong> {book?.description || "No description available."}</p>

          <div className="book-actions">
            {book?.pdfUrl && (
              <>
                <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" className="download-btn" onClick={handleDownload}>
                  📥 Download
                </a>
                   <button onClick={() => setShowPdf(!showPdf)} className="read-online-btn">
                  {showPdf ? "❌ Close Preview" : "📖 Read Online"}
                </button>
              </>
            )}
            <Link to="/Library/browse-books" className="back-btn">🔙 Back to Browse</Link>
          </div>
        <div className="ratings">
          <p><strong>Average Rating:</strong> {rating || "Not rated yet"} ⭐ ({totalRatings} reviews)</p>
          
          {userRating ? (
            <p>✅ You rated this book: {userRating} ⭐</p>
          ) : (
          <div className="rating-buttons">
            {[5, 4, 3, 2, 1].map((star) => (
              <button 
                key={star} 
                onClick={() => submitRating(star)} 
                className={`star-btn ${userRating >= star ? "selected" : ""}`}
              >
                ⭐
              </button>
            ))}
          </div>
          )}
        </div>
        </div>
      </div>
    </div> 
             {showPdf && book?.pdfUrl && <BookView pdfUrl={book.pdfUrl} />}

    </>
  );
};

export default BookDetails;
