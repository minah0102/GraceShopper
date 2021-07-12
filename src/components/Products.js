import React, { useState, useEffect, useContext } from "react";
import { ProductCard, AdminProductPage } from "./index";
import { Switch, Route, Redirect } from "react-router-dom";
import { fetchAllProducts } from "../api/products";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "..";

const Products = () => {
  const [products, setProducts] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(async () => {
    const allProducts = await fetchAllProducts();
    setProducts(allProducts);
  }, []);

  return (
    <Switch>
      <Route path="/products">
        <Container>
          <Row>
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </Row>
        </Container>
      </Route>
      <Route path="/admin/products">
      {user && user.isAdmin === false ? <Redirect to="/" /> : <AdminProductPage products={products} setProducts={setProducts}/>}
      </Route>
    </Switch>
  );
};

export default Products;
