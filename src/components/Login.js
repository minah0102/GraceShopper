import React from "react";
import { Form } from "react-bootstrap";
const Login = () => {
  const handleLogin = () => {

  }
  return (
    <div className="login">
      {/* <form onClick={handleLogin}>
        <input
          type="text"
          placeholder="username"
        />
        <input type="password"
          placeholder="password"
        />
        <button>Login</button>
        </form> */}
      <Form>
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
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;