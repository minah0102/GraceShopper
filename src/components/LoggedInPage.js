import React, { useContext } from "react";
import { UserContext } from "..";
import RecentOrders from "./RecentOrders";
import Profile from "./Profile";
import { Button, Col, Container, Row } from "react-bootstrap";

const LoggedInPage = () => {
  const { user, setUser, currentUsername } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome {currentUsername}</h1>
      <Container>
        <Row>
          <Col><RecentOrders /></Col>
          <Col><Profile /></Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoggedInPage;
