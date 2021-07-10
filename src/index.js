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
  Product,
  Products,
  Product,
  ProductNav,
  CategoryProducts,
  Checkout,
  LoggedInPage,
  AdminProductPage,
} from "./components";

import { Container } from "react-bootstrap";

import { getOrderByUser, getOrderHistory } from "./api";

import { getToken, getUsername } from "./api/token";

export const UserContext = React.createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [myOrder, setMyOrder] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(getUsername());
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState([]);

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
    // if (currentUsername) {
    getOrderByUser()
      .then((r) => {
        console.log("show me r", r);
        setMyOrder(r);
        setTotal(() => {
          return r.products.reduce((acc, p) => {
            return acc + p.quantity * p.price;
          }, 0);
        });
      })
      .catch((e) => console.error(e));
    // }
  }, [currentUsername]);

  useEffect(() => {
    // if (currentUsername) {
    getOrderHistory()
      .then((r) => {
        console.log("show me history", r);
        setHistory(r);
      })
      .catch((e) => console.error(e));
    // }
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
          <ProductNav />
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
              <Route exact path="/products/:id">
                <Product />
              </Route>
              <Route path="/products/category/:name">
                <CategoryProducts />
              </Route>
              <Route path="/admin/products">
                <AdminProductPage />
              </Route>
              <Route path="/checkout">
                <Checkout myOrder={myOrder} />
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
