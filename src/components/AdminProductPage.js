import React from "react";
import { UpdateProduct, Products } from "./index";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "../css/Product.css";

const AdminProductPage = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Products />
        </Route>
      </Switch>
    </>
  );
};

export default AdminProductPage;
