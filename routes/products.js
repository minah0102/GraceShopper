const express = require("express");
const productsRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require("../db/products");
const { deleteCategoryProduct } = require("../db/categories");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    console.error("GET /products error");
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await getProductById(productId);
    if (!product)
      res.send({
        error: "Missing Product Error",
        message: "No product found with that ID",
      });
    res.send(product);
  } catch (error) {
    console.error("GET /products/:productId error");
    next(error);
  }
});

productsRouter.get("/category/:categoryName", async (req, res, next) => {
  try {
    const {categoryName} = req.params
    const products = await getProductsByCategory(categoryName);
    res.send(products);
  } catch (error) {
    console.error("GET /products/:category error");
    next(error);
  }
});

productsRouter.post("/", requireAdmin, async (req, res, next) => {
  try {
    const { name, description, price, quantity, categoryId } = req.body;
    let imageName = req.body.imageName ? imageName : "dog.jpeg";
    const product = await createProduct({
      name,
      description,
      price,
      quantity,
      imageName,
      categoryId
    });
    res.send(product);
  } catch (error) {
    console.error("GET /products/:productId error");
    next(error);
  }
});

productsRouter.patch('/:productId', async (req, res, next) => {
  const {productId} = req.params;
  const {name, description, price, quantity} = req.body;
  const fields = {};
  if (name) fields.name = name;
  if (description) fields.description = description;
  if (price) fields.price = price;
  if (quantity) fields.quantity = quantity;
  try {
    const updatedProduct = await updateProduct(productId, fields);
    res.send(updatedProduct);
  } catch (error) {
    console.log("PATCH /:productId", error);
    next(error);
  }
})

productsRouter.delete("/:productId", requireAdmin, async (req, res, next) => {
  try {
    const { productId } = req.params;
    const categoryProduct = await deleteCategoryProduct(productId);
    const product = await deleteProduct(productId);
    if (!product)
      res.send({
        error: "Missing Product Error",
        message: "No product found with that ID",
      });
    res.send(product);
  } catch (error) {
    console.error("DELETE /products/:productId error");
    next(error);
  }
});

module.exports = productsRouter;
