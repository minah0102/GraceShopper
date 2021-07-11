import React from "react";
import { Card, Button } from "react-bootstrap";
import "../css/Product.css";
import { Link } from "react-router-dom";
import { addProductToCart } from "../api";

const ProductCard = ({ product }) => {
  const { id, name, price, imageName } = product;

  return (
    <Link to={`/products/${id}`}>
      <Card className="product__card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={`/images/${imageName}`} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
