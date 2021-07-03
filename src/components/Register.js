import React from "react";
import { Form } from "react-bootstrap";

const Register = () => {
  const handleSubmit = () => {

  }
  return (
    <div className="register">
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
        />
        <input
          type="text"
          placeholder="email"
        />
        <input
          type="password"
          placeholder="password"
        />
        <input
          type="password"
          placeholder="confirm password"
        />
        <button>submit</button>
      </form> */}
      <Form>
        <Form.Group controlId="formRegisterEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="username@email.com" />
        </Form.Group>
      </Form>
    </div>
  );
}

export default Register;