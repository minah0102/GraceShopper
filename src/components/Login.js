import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "..";
import { Form, Button } from "react-bootstrap";
import { loginUser } from "../api/users";
import { getOrderByUser } from "../api";

const mystyle = {
  padding: "1rem",
  margin: "1rem",
  display: "flex",
  justifyContent: "center",
};

const Login = () => {
  const history = useHistory();
  const { setUser, setCurrentUsername } = useContext(UserContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const usernameChangeHandler = (e) => {
    e.preventDefault();
    setUsernameInput(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPasswordInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    loginUser(usernameInput, passwordInput).then((result) => {
      const { user, error } = result;
      setIsLoading(false);
      if (error) {
        setError(error);
      }
      if (user) {
        setUser(user);
        setCurrentUsername(user.username);
        handleMyOrder();
        history.push("/authenticated");
      }
    });
  };

  const handleMyOrder = () => {
    console.log("show me inside handleMyOrder");
    getOrderByUser()
      .then((r) => {
        console.log("show me rrrr inside handleMyOrder", r);
        setMyOrder(r);
        setTotal(() => {
          return r.products.reduce((acc, p) => {
            return acc + p.quantity * p.price;
          }, 0);
        });
      })
      .catch((e) => console.error(e));
  };

  return (
    <div style={mystyle}>
      <Form style={{ width: "30rem" }}>
        <h2>Please Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form.Group controlId="formLoginUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={usernameInput}
            onChange={usernameChangeHandler}
          />
        </Form.Group>

        <Form.Group controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={passwordInput}
            onChange={passwordChangeHandler}
          />
        </Form.Group>

        <Form.Group controlId="formLoginCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
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
};

export default Login;
