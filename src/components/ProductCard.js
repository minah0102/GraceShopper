import React from "react";
import { Card, Button } from "react-bootstrap";
import "../css/ProductCard.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { id, name, price, imageName } = product;

  return (
    <Link to={`products/${id}`}>
      <Card className="product__card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={`/images/${imageName}`} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>${price}</Card.Text>
          <Button variant="primary">Add To Cart</Button>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;