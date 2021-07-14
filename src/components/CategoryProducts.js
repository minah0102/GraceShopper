import React, { useState, useEffect } from "react";
import { ProductCard } from "./index";
import { fetchCategoryProducts } from "../api/products";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const { name } = useParams();

  useEffect(async () => {
    const allProducts = await fetchCategoryProducts(name);
    const availableProducts = allProducts.filter(
      (product) => product.quantity >= 0
    );
    setProducts(availableProducts);
  }, [name]);

  return (
    <Container>
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Container>
            <p>No results</p>
          </Container>
        )}
      </Row>
    </Container>
  );
};

export default CategoryProducts;
