import React, { useState, useEffect } from "react";
import { fetchCategories, fetchProductById } from "../api/products";
import { Form, Button } from "react-bootstrap";
import {updateProduct} from '../api/products'
import "../css/UpdateProduct.css";



const UpdateProduct = ({ product, setShowEditModal }) => {
  const { name, description, price, category, quantity } = product;
  const [categories, setCategories] = useState([]);
  const [nameInput, setNameInput] = useState(name);
  const [descInput, setDescInput] = useState(description);
  const [priceInput, setPriceInput] = useState(price);
  const [categoryInput, setCategoryInput] = useState(category);
  const [quantityInput, setQuantityInput] = useState(quantity)

  useEffect(async () => {
    const categories = await fetchCategories();
    setCategories(categories);
  }, []);

  const nameHandler = (event) => {
    setNameInput(event.target.value);
  };

  const descHandler = (event) => {
    setDescInput(event.target.value);
  };

  const priceHandler = (event) => {
    setPriceInput(event.target.value);
  };

  const categoryHandler = (event) => {
    setCategoryInput(event.target.value);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    console.log("UPDATE")
    const updatedProduct = await updateProduct({name: nameInput, description: descInput, price: priceInput, quantity: quauntityInput});
    //need to update state
  }

  return (
    <Form id="update__product__form">
      <Form.Group controlId="editProductTitle">
        <Form.Label>Name</Form.Label>
        <Form.Control value={nameInput} onChange={nameHandler} />
      </Form.Group>
      <Form.Group controlId="editProductDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={descInput} onChange={descHandler} />
      </Form.Group>
      <Form.Group controlId="editProductPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control value={priceInput} onChange={priceHandler}/>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Example select</Form.Label>
        <Form.Control as="select" value={categoryInput} onChange={categoryHandler}>
          <option key={0}>{category}</option>
          {categories.map((category) => {
            let { id, name } = category;
            name = name.charAt(0).toUpperCase() + name.slice(1);
            return <option key={id}>{name}</option>;
          })}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleUpdateProduct}>
        Update
      </Button>
      <Button variant="danger" onClick={handleCancelEdit}>Cancel</Button>
    </Form>
  );
};

export default UpdateProduct;
