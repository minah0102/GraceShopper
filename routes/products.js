const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require("../db/products");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    console.error("GET /products error");
    next(error);
  }
});

// will need to add requireUser
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

// will need to add requireAdmin
productsRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;
    let imageName = req.body.imageName ? imageName : "dog.jpeg";
    const product = await createProduct({
      name,
      description,
      price,
      quantity,
      imageName,
    });
    res.send(product);
  } catch (error) {
    console.error("GET /products/:productId error");
    next(error);
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
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
