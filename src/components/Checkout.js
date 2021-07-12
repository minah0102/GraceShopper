import React, { useContext } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { UserContext } from "..";

const Checkout = () => {
  const { orderHistory } = useContext(UserContext);
  const inactiveOrder = orderHistory[orderHistory.length - 1];

  const total = inactiveOrder.products.reduce(
    (acc, p) => {
      return acc + p.quantity * p.price;
    },
    0
  );

  return (
    <>
      <h2>Thank you for shopping!</h2>
      <ListGroup>
        <h3>Order #{inactiveOrder.id}</h3>
        {inactiveOrder.products.map(
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
                      ${Number.parseInt(price).toFixed(2)}
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
          }
        )}
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
