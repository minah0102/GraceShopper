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
import { patchQuantity, deleteProductFromCart, patchInactive } from "../api";
import { useHistory } from "react-router-dom";

const Cart = ({ myOrder, setMyOrder }) => {
  const history = useHistory();
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

  const handleCheckout = async () => {
    const inactive = await patchInactive(myOrder.id);
    console.log("show me inactive", inactive);
    history.push("/checkout")
  }

  return (
    <>
      <h2>Your shopping cart</h2>
      <Row>
        <Col md={8}>
          {myOrder && (
            <ListGroup>
              {myOrder.products.map(
                ({
                  productId,
                  price,
                  quantity,
                  name,
                  description,
                  imageName,
                  orderId,
                  lineItemId,
                }) => {
                  return (
                    <ListGroup.Item key={productId}>
                      <Row style={{
                  alignItems:"center"
                }}>
                        <CloseButton onClick={() => handleDelete(lineItemId)} />
                        <Col xs={3}>
                          <img src={`/images/${imageName}`} width="120px" />
                        </Col>
                        <Col style={{display:"flex", justifyContent:"space-between"}}>
                          {name}
                          <span style={{ color: "red" }}>
                            ${Number.parseInt(price).toFixed(2)}
                          </span>
                        </Col>
                        <Col xs={3}>
                          <Form.Control
                            as="select"
                            defaultValue={quantity}
                            style={{ marginBottom: "10px" }}
                            onChange={(e) => setQuantity(e.target.value)}
                            onClick={() => handleUpdateQuantity(lineItemId)}
                          >
                            {[...Array(50)].map((_, idx) => (
                              <option key={idx}>{idx + 1}</option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                }
              )}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title style={{display:"flex", justifyContent:"space-between"}}>
                Total: <span style={{ color: "red" }}>${total.toFixed(2)}</span>
              </Card.Title>
              <Button variant="primary" block onClick={handleCheckout}>
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
