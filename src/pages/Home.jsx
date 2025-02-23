import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    // Fetch Genres with Book Count
    fetch("http://localhost:8000/api/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((err) => console.error("Error fetching genres:", err));

    // Fetch Popular Books (already sorted by backend)
    fetch("http://localhost:8000/api/popular-books")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPopularBooks(data))
      .catch((err) => console.error("Error fetching popular books:", err));
  }, []);
  
  const handleViewDetails = async (book) => {
    const bookname = book.name; // Handle both cases
  
    if (!bookname) {
      console.error("Book ID is missing:", book);
      return;
    }
  
    try {
      await fetch(`http://localhost:8000/api/books/${bookname}/increment-visit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      });
      console.log(`Visit count increased for: ${book.name}`);
    } catch (error) {
      console.error("Failed to update visit count:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Online Library 📚</h1>
      <p>Discover a world of knowledge and entertainment. Explore our vast collection of books.</p>

      {/* Genres Section */}
      <section className="genres">
        <h2>Book Categories</h2>
        {genres.length > 0 ? (
          <ul>
            {genres.map((genre) => (
              <li key={genre.name}>
                <Link to={`/Library/browse-books/${genre.name.toLowerCase()}`}>
                  {genre.name} ({genre.count} books)
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading categories...</p>
        )}
      </section>

      {/* Popular Books Section */}
      <section className="popular-books">
        <h2>Popular Books 📖</h2>
        {popularBooks.length > 0 ? (
          <ul>
            {popularBooks.map((book) => (
              <li className="popular-book" key={book.id}>
                <Link onClick={() => handleViewDetails(book)} to={`/Library/book/${book.name}`}>
                  <img src={book.imageUrl} alt={book.name} className="popular-book-cover" />
                  <div>
                    <h3>{book.name}</h3>
                    <p>by {book.author}</p>
                    <p>👀 {book.visitCount || 0} visits • 📥 {book.downloadCount || 0} downloads</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading popular books...</p>
        )}
      </section>
    </div>
  );
};

export default Home;
