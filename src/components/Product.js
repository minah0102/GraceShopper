import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Accordion,
  Card,
} from "react-bootstrap";
import { fetchProductById } from "../api/products";
import "../css/ProductCard.css";

import { useParams } from "react-router-dom";
import { Reviews, ReviewForm } from "./index.js";

const Product = () => {
  const [currentProduct, setCurrentProduct] = useState({});

  let { id } = useParams();

  useEffect(async () => {
    const product = await fetchProductById(id);
    console.log("product from fetch", product);
    setCurrentProduct(product);
    console.log("HERE", currentProduct);
  }, []);

  const { name, description, imageName, price, reviews, quantity } =
    currentProduct;
  let averageRating;
  if ("reviews" in currentProduct) {
    const productReviews = currentProduct.reviews;
    console.log(currentProduct);
    const ratings = productReviews.map((review) => {
      const { rating } = review;
      return rating;
    });
    console.log(ratings);
    const r = (acc, value) => acc + value;
    const averageRating = ratings.reduce(r) / ratings.length;
    console.log(averageRating);
  }
  console.log("real", averageRating);
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
      <ReviewForm/>
      <Row>
        <Accordion>
          <Card>
            <Card.Header>
              <div>{averageRating}</div>
              {averageRating !== undefined && (
                <h5>Average rating: {averageRating}</h5>
              )}
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Click to see reviews
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Reviews currentProduct={currentProduct} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Row>
    </Container>
  );
};

export default Product;
