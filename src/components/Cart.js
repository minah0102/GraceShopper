import React, { useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  CloseButton,
} from "react-bootstrap";
import { patchQuantity } from "../api";

const Cart = ({ myOrder, setMyOrder }) => {
  const [quantity, setQuantity] = useState();

  const handleUpdateQuantity = async (lineItemId) => {
    const updated = await patchQuantity(lineItemId, quantity);

    const idx = myOrder.products.findIndex((p) => {
      return p.lineItemId === lineItemId;
    });

    const newProducts = [...myOrder.products];

    const updatedProduct = {
      lineItemId: updated.id,
      orderId: updated.orderId,
      price: updated.price,
      productId: updated.productId,
      quantity: updated.quantity,
      name: myOrder.products[idx].name,
      description: myOrder.products[idx].description,
      imageName: myOrder.products[idx].imageName,
    };

    newProducts[idx] = updatedProduct;
    myOrder.products = newProducts;
    setMyOrder(myOrder);
  };

  return (
    <>
      <h2>Your shopping cart</h2>
      <Row>
        <Col md={8}>
          <ListGroup>
            {myOrder.products.map((p) => {
              return (
                <ListGroup.Item key={p.id}>
                  <Row>
                  <CloseButton />
                    <Col xs={3}>{p.imageName}</Col>
                    <Col>
                      {p.name}
                      <span style={{ color: "red" }}>
                        ${Number.parseInt(p.price).toFixed(2)}
                      </span>
                    </Col>
                    <Col xs={3}>
                      <Form.Control
                        as="select"
                        defaultValue={p.quantity}
                        style={{ marginBottom: "10px" }}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        {[...Array(50)].map((_, idx) => (
                          <option key={idx}>{idx + 1}</option>
                        ))}
                      </Form.Control>
                      <Button
                        block
                        onClick={() => handleUpdateQuantity(p.lineItemId)}
                      >
                        Update
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total: </Card.Title>
              <Card.Text></Card.Text>
              <Button variant="primary" block>
                Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
