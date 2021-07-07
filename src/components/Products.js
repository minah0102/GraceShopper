import React, { useState, useEffect } from "react";
import { ProductCard, Product } from "./index";
import { fetchAllProducts } from "../api/products";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const allProducts = await fetchAllProducts();
    setProducts(allProducts);
  }, []);

  return (
    <Container>
      <Row>
        <Router>
          <Route exact path="/products">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </Route>
          <Route path="/products/:id">
            <Product />
          </Route>
        </Router>
      </Row>
    </Container>
  );
};

export default Products;
