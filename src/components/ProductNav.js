import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";

import { fetchCategories } from "../api/products";

const ProductNav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const categories = await fetchCategories();
    setCategories(categories);
  }, []);

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/products">All Products</Nav.Link>
            {categories.map((category) => {
              let { name } = category;
              name = name.charAt(0).toUpperCase() + name.slice(1);
              return (
                <Nav.Link>
                  <Link to={`/products/category/${name.toLowerCase()}`}>{name}</Link>
                </Nav.Link>
              );
            })}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default ProductNav;
