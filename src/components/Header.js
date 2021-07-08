import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "./MainAuth";

const Header = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar expand="md">
        <Container>
          <h2>Catnip Corp.</h2>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav" className="justify-content-end">
            <Nav>
              <Nav.Link onClick={() => history.push("/register")}>
                Sign up
              </Nav.Link>

              <UserContext.Provider value={{ user, setUser }}>
                {user ? (
                  <Nav.Link onClick={() => history.push("/home")}>
                    Logout
                  </Nav.Link>
                ) : (
                  <Nav.Link onClick={() => history.push("/login")}>
                    Log in
                  </Nav.Link>
                )}
              </UserContext.Provider>

              <Nav.Link onClick={() => history.push("/cart")}>Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
