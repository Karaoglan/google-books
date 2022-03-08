import axios from "axios";
import { useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookSearch from "./BookSearch";
import Bookmarks from "./Bookmarks";
import { Login } from "./Login";

function App() {
    const logout = async (e) => {
        e.preventDefault();
        const response = await axios.post("/api/auth/logout");
        console.log(response);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Google Books Api</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/booksearch">Book Search</Nav.Link>
                        <Nav.Link href="/bookmarks">Booksmark</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="mx-3">
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text>
                        <Navbar.Text>
                            <a href="#" onClick={logout}>
                                Logout
                            </a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <div>
                    <Router>
                        <Routes>
                            {/* <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
                            <Route path="/bookmarks" element={<Bookmarks />} />
                            <Route
                                path="/booksearch"
                                element={<BookSearch />}
                            />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </Router>
                </div>
            </Container>
        </>
    );
}

export default App;
