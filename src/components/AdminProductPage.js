import React from "react";
import { UpdateProduct, Products } from "./index";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "../css/Product.css"
//page for admin to update, delete, and add products
//comp => ProductNave,

let testProd = {
  name: "Test Product",
  description: "My new product wow!!",
  price: 15,
  category: "Health",
};

const handleAddProduct = (product) => {
  console.log("ADD");
}


const AdminProductPage = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Container className="admin__product__header">
      <h1>Admin Product Page</h1>
      <Button variant="success" onClick={handleAddProduct}>Add Product</Button>
      </Container>
      <Switch>
        <Route path={path}>
          <Products/>
        </Route>
        <Route path={`${path}/update/:productId`}>
          <UpdateProduct product={testProd} />
        </Route>
      </Switch>
    </>
  );
};

export default AdminProductPage;
