import React, { useState } from "react";
import { UpdateProduct, AdminProductCard, AddProduct } from "./index";
import { Container, Button, Row } from "react-bootstrap";
import "../css/Product.css";

const AdminProductPage = ({ products, setProducts }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});

  const handleAddProduct = (product) => {
    console.log("ADD");
    setShowAddModal(true);
  };

  return (
    <>
      {showEditModal ? (
        <UpdateProduct
          product={productToEdit}
          setShowEditModal={setShowEditModal}
          setProducts={setProducts}
        />
      ) : showAddModal ? (
        <AddProduct setShowAddModal={setShowAddModal} />
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
    </>
  );
};

export default AdminProductPage;
