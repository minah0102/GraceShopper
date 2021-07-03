import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header, Register, Login, Checkout } from "./components";

const App = () => {
  return (
    <Router>
      <div id="app">
        <Header />
        <main>
          <Switch>
          <Route path="/register">
              <Register />
            </Route>

          <Route path="/login">
              <Login />
            </Route>

            <Route path="/cart">
              <Checkout />
            </Route>

          </Switch>
        </main>
      </div>
    </Router>
  );
};

render(<App />, document.getElementById("main"));
