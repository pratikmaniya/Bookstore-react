import { Col } from 'react-bootstrap';

import { useDispatch } from "react-redux";
import { showEditBookModal, deleteBook } from './Redux/booksSlice';
import { IBook } from '../../../types'

export default function Book({ book }: { book: IBook }) {
  const dispatch = useDispatch();
  return (
    <Col lg={4} md={6} sm={12} className="mb-4">
      <div
        className="border p-4 cursor-pointer"
        onClick={() => dispatch(showEditBookModal(book))}
      >
        <h3 className="font-weight-bold">
          {book.name}
        </h3>
        <div>
          <p>
            <span className="font-weight-bold">Price:</span> {book.price}
          </p>
          <p>
            <span className="font-weight-bold">Category:</span> {book.category}
          </p>
          <p className="break-all">
            <span className="font-weight-bold">Description:</span> {book.description}
          </p>
        </div>
        <div className="mt-auto">
          <button
            className="btn btn-danger font-weight-bold"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteBook(book.id));
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Col>
  );
}
