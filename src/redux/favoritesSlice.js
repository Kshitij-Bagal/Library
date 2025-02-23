import { createSlice, createSelector } from "@reduxjs/toolkit";

const loadFavorites = () => {
  const savedFavorites = localStorage.getItem("favoriteBooks");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const saveFavorites = (favorites) => {
  localStorage.setItem("favoriteBooks", JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteBooks: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const book = action.payload;
      if (!state.favoriteBooks.some((fav) => fav.id === book.id)) {
        state.favoriteBooks.push(book);
        saveFavorites(state.favoriteBooks);
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteBooks = state.favoriteBooks.filter((book) => book.id !== action.payload);
      saveFavorites(state.favoriteBooks);
    },
  },
});

// Properly memoized selector to prevent re-render issues
export const selectFavoriteBooks = createSelector(
  (state) => state.favorites.favoriteBooks,
  (favoriteBooks) => [...favoriteBooks] // Return a new array to break reference equality
);

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
