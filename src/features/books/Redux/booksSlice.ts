import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

import { initialBooks } from './initialBooks'
import { IBooksSliceState, IBook } from '../../../../types';

const initialState: IBooksSliceState = {
  books: [...initialBooks],
  showModal: false,
  selectedBook: null,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addBook: (state, action: PayloadAction<Omit<IBook, "id">>) => {
      const newBook = {
        id: state.books.length + 1,
        ...action.payload,
      };
      state.books.push(newBook);
      state.showModal = false;
      state.selectedBook = null;
    },
    deleteBook: (state, action: PayloadAction<IBook["id"]>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    updateBook: (state, action: PayloadAction<IBook>) => {
      state.books = state.books.map((book) => {
        if (book.id === action.payload.id) {
          return { ...book, ...action.payload };
        }
        return book;
      });
      state.showModal = false;
      state.selectedBook = null;
    },
    showAddBookModal: (state, action: PayloadAction<boolean>) => {
      state.selectedBook = null;
      state.showModal = action.payload;
    },
    showEditBookModal: (state, action: PayloadAction<IBook>) => {
      console.log(action)
      state.selectedBook = action.payload;
      state.showModal = true;
    },
  }
});

export const { addBook, deleteBook, updateBook, showAddBookModal, showEditBookModal } = bookSlice.actions;

export const selectBooks = (state: RootState) => state.books.books;
export const selectShowModal = (state: RootState) => state.books.showModal;
export const selectSelectedBook = (state: RootState) => state.books.selectedBook;

export default bookSlice.reducer;
