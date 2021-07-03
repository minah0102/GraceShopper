import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar expand="md">
        <Container>
          <h2>Catnip Corp.</h2>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="#">Sign up</Nav.Link>
              <Nav.Link href="#">Log in</Nav.Link>
              <Nav.Link href="#">Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
