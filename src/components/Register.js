import React from "react";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  
  return (
      <Form>
        <Form.Group controlId="formRegisterUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="username"/>
        </Form.Group>

        <Form.Group controlId="formRegisterEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="username@email.com" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>

        <Button>Submit</Button>
      </Form>
  );
}

export default Register;