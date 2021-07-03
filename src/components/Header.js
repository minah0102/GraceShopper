import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
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

              <LinkContainer to="/login">
                <Nav.Link>Log in</Nav.Link>
              </LinkContainer>

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
