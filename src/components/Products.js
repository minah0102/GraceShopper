import React, { useState, useEffect } from "react";
import { ProductCard, AdminProductCard, UpdateProduct } from "./index";
import { Switch, Route } from "react-router-dom";
import { fetchAllProducts } from "../api/products";
import { Container, Row, Button } from "react-bootstrap";

const Products = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const allProducts = await fetchAllProducts();
    setProducts(allProducts);
  }, []);

  const handleAddProduct = (product) => {
    console.log("ADD");
  };

  console.log("products", products);
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
        {showEditModal ? (
          <UpdateProduct
            product={productToEdit}
            setShowEditModal={setShowEditModal}
            setProducts={setProducts}
          />
        ) : (
          <>
            <Container className="admin__product__header">
              <h1>Admin Product Page</h1>
              <Button variant="success" onClick={handleAddProduct}>
                Add Product
              </Button>
            </Container>
            <Container>
              <Row>
                {products &&
                  products.map((product) => (
                    <AdminProductCard
                      key={product.id}
                      product={product}
                      setShowEditModal={setShowEditModal}
                      setProductToEdit={setProductToEdit}
                    />
                  ))}
              </Row>
            </Container>
          </>
        )}
      </Route>
    </Switch>
  );
};

export default Products;
