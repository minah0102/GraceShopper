import React, { useState, useEffect } from "react";
import { ProductCard, AdminProductCard, UpdateProduct } from "./index";
import { Switch, Route } from "react-router-dom";
import { fetchAllProducts } from "../api/products";
import { Container, Row } from "react-bootstrap";

const Products = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState({})
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const allProducts = await fetchAllProducts();
    setProducts(allProducts);
  }, []);

  console.log("products", products);
  return (
    <Switch>
      <Route path="/products">
        <Container>
          <Row>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Row>
        </Container>
      </Route>
      <Route path="/admin/products">
        {showEditModal ? (
          <UpdateProduct product={productToEdit} setShowEditModal={setShowEditModal}/>
        ) : (
          <Container>
            <Row>
              {products.map((product) => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  setShowEditModal={setShowEditModal}
                  setProductToEdit={setProductToEdit}
                />
              ))}
            </Row>
          </Container>
        )}
      </Route>
    </Switch>
  );
};

export default Products;
