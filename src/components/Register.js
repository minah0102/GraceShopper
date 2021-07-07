import React from "react";
import { Form, Button } from "react-bootstrap";

const mystyle = {
  padding: "1rem",
  margin: "1rem",
  display: "flex",
  justifyContent: "center"
};

const handleRegisterUser = () => {
  
}

const Register = () => {

  return (
    <div style={mystyle}>
      <Form style={{width: "30rem"}}>
        <Form.Group controlId="formRegisterUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="username" />
        </Form.Group>

        <Form.Group controlId="formRegisterEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="username@email.com" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            Password must be more than 8 characters.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>

        <Button onClick={handleRegisterUser}>Submit</Button>
      </Form>
    </div>
  );
}

export default Register;