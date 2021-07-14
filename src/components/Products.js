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
    const availableProducts = allProducts.filter(product => product.quantity >= 0)
    setProducts(availableProducts);
  }, [products]);

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
      <Route path="/admin">
      {user && user.isAdmin === false ? <Redirect to="/" /> : <AdminProductPage products={products} setProducts={setProducts}/>}
      </Route>
    </Switch>
  );
};

export default Products;
