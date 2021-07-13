import React, { useState, useContext } from "react";
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
import { UserContext } from "..";

const Cart = () => {
  const {
    myOrder,
    setMyOrder,
    currentUsername,
    total,
    setTotal,
    orderHistory,
    setOrderHistory,
    localCart,
    setLocalCart,
  } = useContext(UserContext);
  const history = useHistory();

  const renderProducts = currentUsername ? myOrder.products : localCart;

  const handleUpdateQuantity = async (lineItemId, updateQuantity) => {
    if (currentUsername) {
      const updated = await patchQuantity(lineItemId, updateQuantity);

      const idx = myOrder.products.findIndex(
        (p) => p.lineItemId === lineItemId
      );

      const newProducts = [...myOrder.products];

      const updatedProduct = {
        lineItemId: updated.id,
        orderId: updated.orderId,
        price: updated.price,
        productId: updated.productId,
        quantity: updated.quantity,
        name: myOrder.products[idx].name,
        imageName: myOrder.products[idx].imageName,
      };

      newProducts[idx] = updatedProduct;
      myOrder.products = newProducts;
      setMyOrder(myOrder);
      handleTotal();
    } else {
    }
  };

  const handleDelete = async (deletedId) => {
    let deleted = {};
    if (currentUsername) {
      deleted = await deleteProductFromCart(deletedId); //lineItemId

      const newProducts = myOrder.products.filter(
        (p) => p.lineItemId !== deleted.id
      );

      myOrder.products = newProducts;
      setMyOrder(myOrder);
    } else {
      deleted = localCart.find((lc) => deletedId === lc.productId);
      const newLocalCart = localCart.filter((lc) => deletedId !== lc.productId);

      setLocalCart(newLocalCart);
      localStorage.setItem("cart", JSON.stringify(newLocalCart));
    }
    const newTotal = total - deleted.quantity * deleted.price;
    setTotal(newTotal);
  };

  const handleTotal = () => {
    const totalPrice = myOrder.products.reduce((acc, p) => {
      return acc + p.quantity * p.price;
    }, 0);
    setTotal(totalPrice);
  };

  const handleCheckout = async () => {
    const newOrder = await patchInactive(myOrder.id);

    setOrderHistory([...orderHistory, myOrder]);
    setMyOrder(newOrder);
    setTotal(0);

    history.push("/checkout");
  };

  return (
    <>
      <h2>Your shopping cart</h2>
      {
        <Row>
          <Col md={8}>
            {renderProducts && (
              <ListGroup>
                {renderProducts.map((p) => {
                  return (
                    <ListGroup.Item key={p.productId}>
                      <Row
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <CloseButton
                          onClick={() =>
                            p.lineItemId
                              ? handleDelete(p.lineItemId)
                              : handleDelete(p.productId)
                          }
                        />
                        <Col xs={3}>
                          <img src={`/images/${p.imageName}`} width="120px" />
                        </Col>
                        <Col
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
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
                            onChange={(e) => {
                              handleUpdateQuantity(
                                p.lineItemId,
                                e.target.value
                              );
                            }}
                          >
                            {[...Array(50)].map((_, idx) => (
                              <option key={idx}>{idx + 1}</option>
                            ))}
                          </Form.Control>
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
              <Card.Body style={{ width: "100%" }}>
                <Card.Title
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Total: 
                  <span style={{ color: "red" }}>${total.toFixed(2)}</span>
                </Card.Title>
                <Button
                  variant="primary"
                  block
                  onClick={handleCheckout}
                  disabled={renderProducts.length === 0 ? true : false}
                >
                  Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      }
    </>
  );
};

export default Cart;
