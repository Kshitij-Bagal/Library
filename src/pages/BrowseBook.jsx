import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookList from "../components/bookList";
import "../styles/BrowseBook.css";

const BrowseBook = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const { genre } = useParams(); // Get the genre from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Genres
    fetch("https://library-backend-vi4b.onrender.com/api/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((err) => console.error("Error fetching genres:", err));

    // Fetch Books
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://library-backend-vi4b.onrender.com/api/books");
        const data = await response.json();

        if (Array.isArray(data)) {
          setBooks(data);
          setFilteredBooks(data); // Initialize filtered books
        } else {
          console.error("API returned invalid data:", data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (!Array.isArray(books)) return;

    let filtered = [...books];

    // Filter by genre from URL if available
    if (genre) {
      setSelectedGenre(genre);
      filtered = filtered.filter((book) => book.genre.toLowerCase() === genre.toLowerCase());
    }

    // Filter by search input
    if (search.trim() !== "") {
      filtered = filtered.filter(
        (book) =>
          book.name.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [search, books, genre]);

  return (
    <div>
      <h1>Browse Books</h1>
      <div className="filter">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Genre Dropdown */}
        <select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            navigate(`/browse-books/${e.target.value}`);
          }}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.name} value={g.name.toLowerCase()}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* Book List */}
      <BookList books={filteredBooks} />
    </div>
  );
};

export default BrowseBook;
