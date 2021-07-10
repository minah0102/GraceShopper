import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "..";

const Header = () => {
  const history = useHistory();
  const { setUser, currentUsername, setCurrentUsername, setTotal, setMyOrder } =
    useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setCurrentUsername("");
    setTotal(0);
    history.push("/");
  };

  return (
    <>
      <Navbar expand="md">
        <Container>
          <Nav.Link onClick={() => history.push("/")}>
            <h2 style={{ color: "black" }}>Catnip Corp.</h2>
          </Nav.Link>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav" className="justify-content-end">
            <Nav>
              {currentUsername ? (
                <Nav.Link onClick={() => history.push("/authenticated")}>
                  Account
                </Nav.Link>
              ) : (
                <Nav.Link onClick={() => history.push("/register")}>
                  Sign up
                </Nav.Link>
              )}

              {currentUsername ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <Nav.Link onClick={() => history.push("/login")}>
                  Log in
                </Nav.Link>
              )}

              <Nav.Link onClick={() => history.push("/cart")}>Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
