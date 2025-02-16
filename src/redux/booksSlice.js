import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch books from an API
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetch("http://localhost:8000/api/books"); // Replace with actual API URL
  if (!response.ok) throw new Error("Failed to fetch books");
  return await response.json();
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    addBook: (state, action) => {
      state.books.push({ ...action.payload, id: state.books.length + 1 });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setBooks, addBook } = booksSlice.actions;
export default booksSlice.reducer;
