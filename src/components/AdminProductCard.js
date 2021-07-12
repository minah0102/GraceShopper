import React, { useState } from "react";
import { Col, Container, Card, Button } from "react-bootstrap";
import "../css/UpdateProduct.css";
import { Link, useRouteMatch } from "react-router-dom";
import { updateProduct } from "../api/products";

const AdminProductCard = ({ product, setShowEditModal, setProductToEdit }) => {
  const { id, name, description, price, imageName, quantity } = product;

  const handleEditProduct = () => {
    setShowEditModal(true);
    setProductToEdit(product);
  };

  const handleDeleteProduct = async () => {
    // const deletedProduct = await deleteProduct(id);
    const deletedProduct = await updateProduct({ quantity: 0 });
  };

  return (
    <Card className="admin__product__card">
      <Card.Img variant="top" src={`/images/${imageName}`} />
      <Col>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>${price}</Card.Text>
          <Card.Text>Inventory: {quantity}</Card.Text>
        </Card.Body>
        <Col className="update__product__buttons">
          <Button onClick={handleEditProduct}>Edit</Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </Col>
      </Col>
    </Card>
  );
};

export default AdminProductCard;
