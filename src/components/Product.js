import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import { fetchProductById } from "../api/products";
import "../css/ProductCard.css";

import { useParams } from "react-router-dom";

const Product = () => {
  const [currentProduct, setCurrentProduct] = useState({});

  let { id } = useParams();

  useEffect(async () => {
    const product = await fetchProductById(id);
    setCurrentProduct(product);
  }, []);

  const {
    name,
    description,
    imageName,
    price,
    reviews,
    quantity,
  } = currentProduct;

  let selectQuantity = [];
  for (let i = 1; selectQuantity.length < quantity; i++) {
    selectQuantity.push(i);
  }

  return (
    <Container>
      <Row className="product__container">
        <Col>
          <Image
            className="product__image"
            src={`/images/${imageName}`}
            rounded
          />
        </Col>
        <Col className="product__info">
          <h1>{name}</h1>
          <div>{description}</div>
          <Row className="product__footer">
            <div className="button__container">
              <Button id="add__product" variant="primary">
                Add To Cart
              </Button>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control as="select">
                  {selectQuantity.map((quantity) => (
                    <option>{quantity}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
            <div className="product__price">${price}</div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
