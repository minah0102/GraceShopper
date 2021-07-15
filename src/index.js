import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import {
  Header,
  Home,
  Register,
  Login,
  ReviewForm,
  Cart,
  Donate,
  Products,
  Product,
  ProductNav,
  CategoryProducts,
  Checkout,
  LoggedInPage,
  Admin,
  AdminProductPage,
  AdminUserInfoPage,
} from "./components";

import { Container } from "react-bootstrap";

import { getOrderByUser, getOrderHistory } from "./api";

import { getTokenConfig } from "./api/token";

export const UserContext = React.createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [myOrder, setMyOrder] = useState(null);
  const [currentUsername, setCurrentUsername] = useState("");
  const [total, setTotal] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setLocalCart(cart);
      setTotal(() => {
        return cart.length !== 0
          ? cart.reduce((acc, c) => {
              return acc + c.quantity * c.price;
            }, 0)
          : 0;
      });
    }
  }, []);

  useEffect(() => {
    const { config } = getTokenConfig();

    fetch("/api/users/me", config)
      .then((d) => d.json())
      .then((u) => {
        if (u) {
          setUser(u);
          setCurrentUsername(u.username);
        }
      });
  }, []);

  useEffect(() => {
    const { config } = getTokenConfig();
    fetch(`/api/users/users`, config)
      .then((response) => response.json())
      .then((u) => {
        setUsers(u);
      });
  }, []);

  useEffect(() => {
    if (currentUsername) {
      getOrderByUser()
        .then((r) => {
          setMyOrder(r);
          if (r.products) {
            setTotal(() => {
              return r.products.reduce((acc, p) => {
                return acc + p.quantity * p.price;
              }, 0);
            });
          }
        })
        .catch((e) => console.error(e));
    }
  }, [currentUsername]);

  useEffect(() => {
    if (currentUsername) {
      getOrderHistory()
        .then((r) => {
          setOrderHistory(r);
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
            users,
            setUsers,
            currentUsername,
            setCurrentUsername,
            myOrder,
            setMyOrder,
            total,
            setTotal,
            orderHistory,
            setOrderHistory,
            localCart,
            setLocalCart,
          }}
        >
         {/* <Container> */}
            <Header />
            <ProductNav />

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
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/authenticated">
                {currentUsername ? <LoggedInPage /> : <Login />}
              </Route>
              <Route path="/admin">
                {user && user.isAdmin ? <Admin /> : <Redirect to="/" />}
              </Route>
            </Switch>
            {/* <ReviewForm /> */}
          {/* </Container> */}
        </UserContext.Provider>
      </div>
    </Router>
  );
};

render(<App />, document.getElementById("main"));
