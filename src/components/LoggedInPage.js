import React, { useContext } from "react";
import { UserContext } from "..";
import RecentOrders from "./RecentOrders";
import Profile from "./Profile";
<<<<<<< HEAD
import { Button, Col, Container, Row } from "react-bootstrap";
import '../css/User.css'
=======
import { Col, Container, Row } from "react-bootstrap";
>>>>>>> efe639c605a7c15c310389d9588fdd8a29045c25

const LoggedInPage = () => {
  const { user } = useContext(UserContext);

  return (
<<<<<<< HEAD
    <div id="welcome-user">
      <h1>Welcome {currentUsername}</h1>
=======
    <div>
      <h1>Welcome {user.username}</h1>
>>>>>>> efe639c605a7c15c310389d9588fdd8a29045c25
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
