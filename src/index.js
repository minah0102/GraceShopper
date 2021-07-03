import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header, Checkout } from "./components";

const App = () => {
  return (
    <div id="app">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/cart">
              <Checkout />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("main"));
