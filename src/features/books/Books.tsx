import { Container, Row } from 'react-bootstrap';

import AddBookButton from "./AddBookButton";
import Book from "./Book";
import PopUp from "./Modal";

import { useAppSelector } from '../../app/hooks';
import { selectBooks } from './Redux/booksSlice';

export function Books() {
  const books = useAppSelector(selectBooks);

  return (
    <Container>
      <Row>
        <AddBookButton />
      </Row>
      <Row>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </Row>

      <PopUp />
    </Container>
  );
}
