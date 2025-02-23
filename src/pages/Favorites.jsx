import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoritesSlice";
import "../styles/Favorites.css";
import Book from '../components/book'

const Favorites = () => {
    const favorites = useSelector((state) => state.favorites.favoriteBooks) || [];

  const dispatch = useDispatch();

  return (
    <>
    <h2>Favorite Books</h2>
    <div className="favorites">
      
      {favorites.length === 0 ? (
        <p>No favorite books yet.</p>
      ) : (
        favorites.map((book) => (
          <div key={book.id} className="favorite-book">
            <img src={book.imageUrl} className="favorite-book-cover" alt={book.name} />
            <h3>{book.name}</h3>
            <p>{book.author}</p>
            <button onClick={() => dispatch(removeFavorite(book.id))}>
              Remove from Favorites
            </button>
          </div>
        ))
      )}
    </div></>
  );
};

export default Favorites;
