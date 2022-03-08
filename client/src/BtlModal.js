import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export default function BtlModal(props) {
  console.log(props.selectedBook);

  const [id, setId] = useState(props.selectedBook.id);
  const [bookmarked, setBookmarked] = useState(undefined);

  const queryApi = '/api/bookmarks';

  useEffect(() => {
    console.log('useee');
    setId(props.selectedBook.id);
    getBookmark(id);
  }, [props.selectedBook]);

  const getBookmark = (id) => {
    const queryApi = '/api/bookmarks/' + id;

    try {
      axios.get(queryApi).then((res) => {
        setBookmarked(true);
      });
    } catch (e) {
      console.error('Failed');
      setBookmarked(false);
    }
  };

  const addBookmark = () => {
    console.log(id);
    axios.post(queryApi + '/addBookmark/', { bookId: id }).then();
    props.onHide();
  };

  const deleteBookmark = () => {
    axios.delete(queryApi, { bookId: id }).then();
    props.onHide();
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.selectedBook.volumeInfo.title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!bookmarked ? (
            <Button onClick={addBookmark}>Add Bookmarks</Button>
          ) : (
            <Button onClick={deleteBookmark}>Delete From Bookmarks</Button>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
