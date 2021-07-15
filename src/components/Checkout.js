import React, { useContext } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { UserContext } from "..";

const Checkout = () => {
  const { orderHistory, currentUsername, localCart } = useContext(UserContext);

  const renderProducts = currentUsername
    ? orderHistory[orderHistory.length - 1].products
    : localCart;

  if (localStorage.getItem("cart")) {
    localStorage.removeItem("cart");
  }

  const total = renderProducts.reduce((acc, p) => {
    return acc + p.quantity * p.price;
  }, 0);

  const orderHeader = renderProducts[0].orderId
    ? `Order #${renderProducts[0].orderId}`
    : ``;

  return (
    <>
      <h2>Thank you for shopping!</h2>
      <ListGroup>
        <h3>{orderHeader}</h3>
        {renderProducts.map(({ price, quantity, name, imageName }) => {
          return (
            <ListGroup.Item>
              <Row
                style={{
                  alignItems: "center",
                }}
              >
                <Col xs={3}>
                  <img src={`/images/${imageName}`} width="120px" />
                </Col>
                <Col
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {name}
                  <span style={{ color: "red" }}>
                    ${Number.parseFloat(price).toFixed(2)}
                  </span>
                </Col>
                <Col
                  xs={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {quantity}
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
        <h3 style={{ display: "flex", justifyContent: "flex-end" }}>
          Total:{" "}
          <span style={{ color: "red", marginLeft: "20px" }}>
            ${total.toFixed(2)}
          </span>
        </h3>
      </ListGroup>
    </>
  );
};

export default Checkout;
