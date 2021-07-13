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
import { addProductToCart, patchQuantity } from "../api";
import "../css/Product.css";

import { useParams, useHistory } from "react-router-dom";
import { Reviews } from "./index.js";
import { UserContext } from "..";

const Product = () => {
  const {
    myOrder,
    setMyOrder,
    total,
    setTotal,
    currentUsername,
    localCart,
    setLocalCart,
  } = useContext(UserContext);
  const [currentProduct, setCurrentProduct] = useState({});
  const [addQuantity, setAddQuantity] = useState(1);

  const history = useHistory();

  let id = +useParams().id;

  useEffect(async () => {
    const product = await fetchProductById(id);
    setCurrentProduct(product);
  }, []);

  const { name, description, imageName, price, reviews, quantity } =
    currentProduct;

  // const productReviews = currentProduct.reviews;
  // console.log(productReviews);
  // const ratings = productReviews.map((review) => {
  //   const { rating } = review;
  //   return rating;
  // });
  // console.log(ratings);
  // const r = (acc, value) => acc + value;
  // const averageRating = ratings.reduce(r) / ratings.length;
  // console.log(averageRating);

  let selectQuantity = [];
  for (let i = 1; selectQuantity.length < quantity; i++) {
    selectQuantity.push(i);
  }

  const handleAddToCart = async () => {
    if (currentUsername) {
      console.log("show me product from useParams id", id);
      console.log("show me myOrder", myOrder);
      const sameProduct = myOrder.products.find((p) => p.productId === id);
      console.log("show me sameProduct", sameProduct);

      if (sameProduct) {
        const idx = myOrder.products.findIndex((p) => p.productId === id);
        const updated = await patchQuantity(
          sameProduct.lineItemId,
          sameProduct.quantity + addQuantity
        );

        console.log("show me updated", updated);
        myOrder.products[idx].quantity += addQuantity;
      } else {
        const added = await addProductToCart(
          myOrder.id,
          id,
          price,
          addQuantity
        );

        const addedProduct = {
          lineItemId: added.id,
          orderId: added.orderId,
          price: added.price,
          productId: id,
          quantity: added.quantity,
          name,
          imageName,
        };
        myOrder.products.push(addedProduct);
      }

      setMyOrder(myOrder);
    } else {
      //no currentUsername - local cart
      const existing = localCart.find((lc) => lc.productId === id);

      if (existing) {
        const idx = localCart.findIndex(
          (lc) => existing.productId === lc.productId
        );

        localCart[idx].quantity += addQuantity;
      } else {
        //no exsiting product
        const lineItem = {
          productId: id,
          name,
          price,
          quantity: addQuantity,
          imageName,
        };

        localCart.push(lineItem);
      }
      setLocalCart(localCart);

      localStorage.setItem("cart", JSON.stringify(localCart));
    }
    const newTotal = total + addQuantity * price;
    setTotal(newTotal);

    history.push("/cart");
  };

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
      <Row>
        <Accordion>
          <Card>
            {/* <Card.Header>
              <h5>Average rating: {averageRating}</h5>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Click to see reviews
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Reviews currentProduct={currentProduct} />
              </Card.Body>
            </Accordion.Collapse> */}
          </Card>
        </Accordion>
      </Row>
    </Container>
  );
};

export default Product;
