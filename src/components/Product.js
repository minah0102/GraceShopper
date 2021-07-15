import React, { useEffect, useState, useContext } from "react";
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
import { addProductToCart } from "../api";
import "../css/Product.css";
import { FaStar } from "react-icons/fa";

import { useParams, useHistory } from "react-router-dom";
import { Reviews, ReviewForm, SingleRating } from "./index.js";
import { UserContext } from "..";

const Product = () => {
  const {
    myOrder,
    setMyOrder,
    total,
    setTotal,
    currentUsername,
    orderHistory,
    user,
    setUser,
  } = useContext(UserContext);
  const [currentProduct, setCurrentProduct] = useState({});
  const [addQuantity, setAddQuantity] = useState(1);
  const history = useHistory();

  let { id } = useParams();

  useEffect(async () => {
    const product = await fetchProductById(id);
    console.log("product from fetch", product);
    setCurrentProduct(product);
  }, []);

  const { name, description, imageName, price, reviews, quantity } =
    currentProduct;
  console.log(currentProduct);
  let averageRating;
  if ("reviews" in currentProduct) {
    const ratings = currentProduct.reviews.map((review) => {
      const { rating } = review;
      return rating;
    });

    const r = (acc, value) => acc + value;
    if (ratings.length > 0) {
      averageRating = Math.round(ratings.reduce(r) / ratings.length);
    }
  }
  let selectQuantity = [];
  for (let i = 1; selectQuantity.length < quantity; i++) {
    selectQuantity.push(i);
  }

  const matchProducts = orderHistory.map((order) => {
    return order.products.filter((product) => {
      return product.productId === id;
    });
  });
  const handleAddToCart = async () => {
    const added = await addProductToCart(myOrder.id, id, price, addQuantity);

    const sameProduct = myOrder.products.filter(
      (p) => Number.parseInt(p.productId) === added.productId
    );

    if (sameProduct.length !== 0) {
      const idx = myOrder.products.findIndex(
        (p) => Number.parseInt(p.productId) === added.productId
      );
      myOrder.products[idx].quantity = added.quantity;
    } else {
      const addedProduct = {
        lineItemId: added.id,
        orderId: added.orderId,
        price: added.price,
        productId: id,
        quantity: added.quantity,
        name,
        description,
        imageName,
      };
      myOrder.products.push(addedProduct);
    }

    setMyOrder(myOrder);
    setTotal(() => {
      return myOrder.products.reduce((acc, p) => {
        return acc + p.quantity * p.price;
      }, 0);
    });
    history.push("/cart");
  };

  return (
    <Container className="single-product-container">
      <Row>
        <Col>
          <Image
            className="product__image"
            src={`/images/${imageName}`}
            rounded
          />
        </Col>
        <Col className="product__info">
          <h1>{name}</h1>
          {averageRating !== undefined && (
            <div>
              {[...Array(averageRating)].map((star, i) => {
                const value = i + 1;
                return (
                  <label key={value}>
                    <FaStar color={"#ffc107"} />
                  </label>
                );
              })}
            </div>
          )}
          <div>{description}</div>
          <Row className="product__footer">
            <div className="button__container">
              <Button
                id="add__product"
                variant="primary"
                onClick={handleAddToCart}
              >
                Add To Cart
              </Button>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  as="select"
                  value={addQuantity}
                  onChange={(e) => setAddQuantity(e.target.value)}
                >
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
      {currentUsername && matchProducts.length > 0 ? (
        <ReviewForm
          id={id}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
        />
      ) : (
        ""
      )}
      {"reviews" in currentProduct && reviews.length > 0 ? (
        <Row>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Click to see reviews
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Reviews
                    currentProduct={currentProduct}
                    setCurrentProduct={setCurrentProduct}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Row>
      ) : (
        <p style={{color: "#1A34F1"}}>No reviews have been left yet</p>
      )}
    </Container>
  );
};

export default Product;
