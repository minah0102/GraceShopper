import React, { useContext } from "react";
import { UserContext } from "..";
import RecentOrders from "./RecentOrders";
import Profile from "./Profile";
import { Col, Container, Row } from "react-bootstrap";

const LoggedInPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <Container>
        <Row>
          <Col xs={8}><RecentOrders /></Col>
          <Col><Profile /></Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoggedInPage;
