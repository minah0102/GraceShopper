import React, { useContext } from "react";
import {
  Container,
  Table,
  Row,
  Col,
  Accordion,
  Card,
  ListGroup,
} from "react-bootstrap";
import { UserContext } from "..";

const cardHeaderStyle = {
  backgroundColor: "#a59c83",
  
}

const RecentOrders = () => {
  const { orderHistory } = useContext(UserContext);
  console.log("show me orderHIstory", orderHistory);
  return (
    <>
      <h2>Recent Orders</h2>

      <Accordion defaultActiveKey="0" flush>
        {orderHistory.length > 0 &&
          orderHistory.map((o, idx) => {
            return (
              <>
                <Card.Header style={cardHeaderStyle}>
                  <Accordion.Toggle 
                    as={ListGroup}
                    eventKey={(idx + 1).toString()}
                  >
                    <Row>
                      <Col md={4}>Order #{o.id}</Col>
                      <Col>
                        purchased on {new Date(o.purchasedDate).toLocaleDateString()}
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse style={{backgroundColor: "#fdfbf8"}} eventKey={(idx + 1).toString()}>
                  <>
                    {o.products.length > 0 &&
                      o.products.map(({ name, price, quantity, imageName }, idx) => {
                        return (
                          <Row
                            style={{
                              alignItems: "center",
                            }} key={idx}
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
                        );
                      })}
                  </>
                </Accordion.Collapse>
              </>
            );
          })}
      </Accordion>
    </>
  );
};

export default RecentOrders;
