import { useDispatch } from "react-redux";
import { Col, Button } from 'react-bootstrap';

import { showAddBookModal } from './Redux/booksSlice';

export default function AddBookButton() {
  const dispatch = useDispatch();
  return (
    <Col sm={12} className="text-start m-4">
      <Button
        variant="primary"
        type="submit"
        style={{ width: 'auto' }}
        onClick={() => dispatch(showAddBookModal(true))}
      >
        Add Book
      </Button>
    </Col>
  );
}
