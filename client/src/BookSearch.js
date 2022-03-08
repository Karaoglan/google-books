import React, { useEffect, useRef, useState } from "react";
import { Form, FloatingLabel, Button, Card, Row, Col } from "react-bootstrap";
import Pagination from "react-bootstrap-4-pagination";
import axios from "axios";
import BtlModal from "./BtlModal";
import { BsFillBookmarkCheckFill, BsBookmark } from "react-icons/bs";

const PAGE_SIZE = 9;

export default function BookSearch() {
    const keywordsRef = useRef();
    const titleRef = useRef();
    const authorRef = useRef();
    const [books, setBooks] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [selectedBook, setSelectedBook] = useState();

    useEffect(() => {
        fetchBooks();
    }, [pageNumber]);

    const fetchBooks = () => {
        let bodyObject = {
            keywords: keywordsRef.current.value,
            author: authorRef.current.value,
            title: titleRef.current.value,
            startIndex: getPageStartIndex(),
        };

        try {
            axios.post("/api/bookSearch", bodyObject).then((res) => {
                setTotalItems(res.data.totalItems);
                if (res.data.totalItems) {
                    setBooks(res.data.items);
                } else {
                    setBooks([]);
                }
            });
        } catch {
            console.error("Failed to log in");
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        fetchBooks();
    }

    const getTotalPage = () => {
        return Math.ceil(totalItems / PAGE_SIZE);
    };

    const getPageStartIndex = () => {
        return (pageNumber - 1) * PAGE_SIZE;
    };

    let paginationConfig = {
        totalPages: getTotalPage(),
        currentPage: pageNumber,
        showMax: 5,
        size: "lg",
        threeDots: false,
        prevNext: true,
        onClick: function (page) {
            console.log(page);
            setPageNumber(page);
        },
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="g-2">
                            <Col md>
                                <Form.Group id="keywords">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Keywords"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="Keywords"
                                            ref={keywordsRef}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group id="title">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Title"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="Title"
                                            ref={titleRef}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group id="author">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Author"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="Author"
                                            ref={authorRef}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button className="w-100" type="submit">
                            Search Books
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            {totalItems ? (
                <>
                    <Row xs={1} md={3} className="g-4">
                        {books.map((book, idx) => (
                            <Col key={idx}>
                                <Card
                                    onClick={() => {
                                        console.log(book);
                                        setSelectedBook(book);
                                        setModalShow(true);
                                    }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={
                                            book.volumeInfo.imageLinks
                                                ? book.volumeInfo.imageLinks[
                                                      "thumbnail"
                                                  ]
                                                : ""
                                        }
                                    />
                                    {book.bookmarked ? (
                                        <BsFillBookmarkCheckFill />
                                    ) : (
                                        <BsBookmark />
                                    )}
                                    <Card.Body>
                                        <Card.Title>
                                            {book.volumeInfo.title}
                                        </Card.Title>
                                        {/* <Card.Text>{book.volumeInfo.description}</Card.Text> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div>
                        <Pagination {...paginationConfig} />
                        <br />
                    </div>
                </>
            ) : (
                <></>
            )}

            {modalShow && (
                <div>
                    <BtlModal
                        show={true}
                        onHide={() => setModalShow(false)}
                        selectedBook={selectedBook}
                    />
                </div>
            )}
        </>
    );
}

/*


 <AppPagination
              active={pageNumber}
              totalPage={getTotalPage()}
              paginationItemClicked={(pageNum) => setPageNumber(pageNum)}
            ></AppPagination>
            */
