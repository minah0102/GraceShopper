import React from "react";
import { Form, Button } from "react-bootstrap";

const mystyle = {
  padding: "1rem",
  margin: "1rem",
  display: "flex",
  justifyContent: "center"
};

const Login = () => {
  return (
    <div style={mystyle}>
      <Form style={{width: "30rem"}}>
        <Form.Group controlId="formLoginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" />
        </Form.Group>

        <Form.Group controlId="formLoginCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
  );
}

export default Login;