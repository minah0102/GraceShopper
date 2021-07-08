import React , { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "./MainAuth";

const Header = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar expand="md">
        <Container>
          <h2>Catnip Corp.</h2>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav" className="justify-content-end">
            <Nav>
              <LinkContainer to="/register">
                <Nav.Link>Sign up</Nav.Link>
              </LinkContainer>

              <UserContext.Provider value={{ user, setUser }}>
                {user ?
                  <LinkContainer to="/home">
                    <Nav.Link>Logout</Nav.Link>
                  </LinkContainer>
                  :
                  <LinkContainer to="/login">
                    <Nav.Link>Log in</Nav.Link>
                  </LinkContainer>
                }
              </UserContext.Provider>


              <LinkContainer to="/cart">
                <Nav.Link>Cart</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
