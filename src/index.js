import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Header,
  Home,
  Register,
  Login,
  ReviewForm,
  Cart,
  Donate,
  Products,
  Checkout,
  LoggedInPage,
} from "./components";
import { Container } from "react-bootstrap";

import { getOrderByUser } from "./api";

import { getToken, getUsername } from "./api/token";

export const UserContext = React.createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [myOrder, setMyOrder] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(getUsername());
  const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   const token = getToken();
  //   const headers = token
  //     ? {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       }
  //     : {};

  //   fetch("/api/users/me", {
  //     headers,
  //   })
  //     .then((d) => d.json())
  //     .then((u) => {
  //       if (u) {
  //         setUser(u);
  //       }
  //     });
  // }, []);

  useEffect(() => {
    if (currentUsername) {
      getOrderByUser()
        .then((r) => {
          setMyOrder(r);
          setTotal(() => {
            return r.products.reduce((acc, p) => {
              return acc + p.quantity * p.price;
            }, 0);
          });
        })
        .catch((e) => console.error(e));
    }
  }, [currentUsername]);

  return (
    <Router>
      <div id="app">
        <UserContext.Provider
          value={{
            user,
            setUser,
            currentUsername,
            setCurrentUsername,
            myOrder,
            setMyOrder,
            total,
            setTotal,
          }}
        >
          <Header />
          <Container>
            {/* <Donate /> */}
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route exact path="/products">
                <Products />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/authenticated">
                {currentUsername ? <LoggedInPage /> : <Login />}
              </Route>
            </Switch>
            <ReviewForm />
          </Container>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

render(<App />, document.getElementById("main"));
