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
import { patchQuantity, deleteProductFromCart } from "../api";

const Cart = ({ myOrder, setMyOrder }) => {
  const [quantity, setQuantity] = useState();
  const [total, setTotal] = useState(() => {
    return myOrder.products.reduce((acc, p) => {
      return acc + p.quantity * p.price;
    }, 0);
  });

  const handleUpdateQuantity = async (lineItemId) => {
    const updated = await patchQuantity(lineItemId, quantity);

    const idx = myOrder.products.findIndex((p) => p.lineItemId === lineItemId);

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
    handleTotal();
  };

  const handleDelete = async (lineItemId) => {
    const deleted = await deleteProductFromCart(lineItemId);

    const newProducts = myOrder.products.filter(
      (p) => p.lineItemId !== deleted.id
    );

    myOrder.products = newProducts;
    setMyOrder(myOrder);
    handleTotal();
  };

  const handleTotal = () => {
    const totalPrice = myOrder.products.reduce((acc, p) => {
      return acc + p.quantity * p.price;
    }, 0);
    setTotal(totalPrice);
  };

  return (
    <>
      <h2>Your shopping cart</h2>
      <Row>
        <Col md={8}>
          {myOrder && (
            <ListGroup>
              {myOrder.products.map((p) => {
                return (
                  <ListGroup.Item key={p.id}>
                    <Row>
                      <CloseButton onClick={() => handleDelete(p.lineItemId)} />
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
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>
                Total: <span style={{ color: "red" }}>${total.toFixed(2)}</span>
              </Card.Title>
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
