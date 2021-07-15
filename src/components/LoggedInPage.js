import React, { useContext } from "react";
import { UserContext } from "..";
import RecentOrders from "./RecentOrders";
import Profile from "./Profile";
import { Col, Container, Row } from "react-bootstrap";
import '../css/User.css'

const LoggedInPage = () => {
  const { user, currentUsername } = useContext(UserContext);

  return (
    <div id="welcome-user">
      <h1>Welcome {currentUsername}</h1>
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
