import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "..";
import { Form, Button } from "react-bootstrap";
import { registerUser } from "../api/users";

const mystyle = {
  padding: "1rem",
  margin: "1rem",
  display: "flex",
  justifyContent: "center"
};

const Register = () => {
  const history = useHistory();
  const { setUser, setCurrentUsername } = useContext(UserContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();

    if (passwordInput !== confirmPasswordInput) {
      return alert("passwords do not match!");
    }
    setIsLoading(true);

    registerUser(usernameInput, emailInput, passwordInput).then((result) => {
      setIsLoading(false);

      const { user, error } = result;

      if (error) {
        setError(error);
      }
      if (user) {
        setUser(user);
        setCurrentUsername(user.username);
        history.push("/authenticated");
      }
    });
  };

  const usernameChangeHandler = (event) => {
    event.preventDefault();
    setUsernameInput(event.target.value);
  };

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEmailInput(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setPasswordInput(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    event.preventDefault();
    setConfirmPasswordInput(event.target.value);
  };

  return (
    <div style={mystyle}>
      <Form style={{ width: "30rem" }}>
        <h2>Please Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form.Group controlId="formRegisterUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="username"
            value={usernameInput}
            onChange={usernameChangeHandler}
          />
        </Form.Group>

        <Form.Group controlId="formRegisterEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="username@email.com"
            value={emailInput}
            onChange={emailChangeHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={passwordChangeHandler}
          />
          <Form.Text className="text-muted">
            Password must be more than 8 characters.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPasswordInput}
            onChange={confirmPasswordChangeHandler}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={submitHandler}
          disabled={isLoading}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;