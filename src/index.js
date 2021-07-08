import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Header,
  Register,
  Login,
  ReviewForm,
  Cart,
  Donate,
  Products,
  Checkout,
  MainAuth,
  LoggedInPage
} from "./components";
import { Container } from "react-bootstrap";

import { getOrderByUser } from "./api";

const App = () => {
  const [myOrder, setMyOrder] = useState({});

  useEffect(() => {
    getOrderByUser()
      .then((r) => {
        setMyOrder(r);
        console.log("getOrderByUSer", r);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Router>
      <div id="app">
        <Header />
        <Container>
          {/* <Donate /> */}
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/cart">
              <Cart {...{ myOrder, setMyOrder }} />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route path="/checkout"><Checkout myOrder={myOrder}/></Route>
            <Route path="/authenticated">
              <MainAuth />
            </Route>
          </Switch>
          <ReviewForm />
        </Container>
      </div>
    </Router>
  );
};

render(<App />, document.getElementById("main"));
