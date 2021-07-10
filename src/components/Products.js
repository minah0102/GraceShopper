import React, { useState, useEffect } from "react";
import { ProductCard, Product } from "./index";
import { fetchAllProducts } from "../api/products";
import { Container, Row } from "react-bootstrap";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const allProducts = await fetchAllProducts();
    setProducts(allProducts);
  }, []);

  console.log("products", products);
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default Products;
