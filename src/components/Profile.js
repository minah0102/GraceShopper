import React, { useContext } from "react";
import { UserContext } from "..";
import { Form, Row, Col, Button } from "react-bootstrap";

const Profile = () => {
  const { isAdmin, user, currentUsername } = useContext(UserContext);
  console.log("User in Profile", user);
  return (
    // <div>
    //   <h1>
    //     Profile Page
    //   </h1>
    //   <p>Username: {currentUsername}</p>
    //   <p>Email: </p>
    //   {/* <p>Password: </p> */}
    //   {/* {isAdmin === "true" ? 
    //   <Button>View Admin Info</Button> : null } */}
    //   <Button>
    //     Admin
    //   </Button>
    // </div>
    <>
    <h2>Profile</h2>
    <Form>
      <Form.Group as={Row} controlId="formUserProfileUsername">
        <Form.Label column sm="4">Username</Form.Label>
        <Col sm="8">
          <Form.Control plaintext readOnly defaultValue={currentUsername} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formUserProfileEmail">
        <Form.Label column sm="4">Email</Form.Label>
        <Col sm="8">
          <Form.Control plaintext readOnly defaultValue="email@example.com" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formUserProfilePassword">
        <Form.Label column sm="4">
          Password
        </Form.Label>
        <Col sm="8">
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formUserProfileConfirmPassword">
        <Form.Label column sm="4">
          Confirm Password
        </Form.Label>
        <Col sm="8">
          <Form.Control type="password" placeholder="Confirm Password" />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 8, offset: 4 }}>
          <Button type="submit">Reset Password</Button>
        </Col>
      </Form.Group>

      {isAdmin === true ? <Button>Admin Access</Button> : null}
    </Form>
    </>
  )
}
// add button for Admin, if (isAdmin === true) {button for Admin pops up to see all users and edit products}
// no editing email address
export default Profile;