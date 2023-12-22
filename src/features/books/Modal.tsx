import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import { IBook } from "../../../types";
import { useAppSelector } from '../../app/hooks';
import { selectSelectedBook, selectShowModal, showAddBookModal, addBook, updateBook } from './Redux/booksSlice';

export default function PopUp() {
  const defaultEditingBook = {
    name: "",
    price: 0,
    category: "",
    description: "",
  },
    dispatch = useDispatch(),
    selectedBook = useSelector(selectSelectedBook),
    showModal = useAppSelector(selectShowModal),
    [validated, setValidated] = useState(false),
    [editingBook, setEditingBook] = useState<Omit<IBook, "id">>(selectedBook || { ...defaultEditingBook }),
    handleSubmit = (event: any) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidated(true);
      if (form.checkValidity() === true) {
        if (selectedBook) {
          dispatch(
            updateBook({
              ...editingBook,
              id: selectedBook.id,
            })
          );
        } else {
          dispatch(addBook(editingBook));
        }
        console.log("asdasda")
        setEditingBook({ ...defaultEditingBook })
        setValidated(false);
      }
    }
  useEffect(() => {
    if (selectedBook) {
      setEditingBook({ ...selectedBook })
    } else {
      setEditingBook({ ...defaultEditingBook })
    }
  }, [selectedBook])
  return <Modal show={showModal} onHide={() => dispatch(showAddBookModal(false))}>
    <Modal.Header closeButton>
      <Modal.Title>Adding a new book</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Book Name"
            value={editingBook.name}
            onChange={(e) =>
              setEditingBook({ ...editingBook, name: e.target.value })
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom02">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Book Price"
            value={editingBook.price}
            onChange={(e) =>
              setEditingBook({
                ...editingBook,
                price: Number(e.target.value),
              })
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom03">
          <Form.Label>Category</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Book Category"
            value={editingBook.category}
            onChange={(e) =>
              setEditingBook({ ...editingBook, category: e.target.value })
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom04">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="textarea"
            placeholder="Book Description"
            value={editingBook.description}
            onChange={(e) =>
              setEditingBook({ ...editingBook, description: e.target.value })
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Button
          className='m-2'
          variant="secondary"
          onClick={() => dispatch(showAddBookModal(false))}
        >Cancel</Button>
        <Button variant="primary"
          className='m-2'
          type='submit'
        >{selectedBook ? "Update" : "Add Book"}</Button>
      </Form>
    </Modal.Body>
  </Modal>
}
