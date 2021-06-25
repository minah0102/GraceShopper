const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  getProductReviews,
} = require("../db/products");

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    console.log("PRODUCTS", products);
    res.send(products);
  } catch (error) {
    console.error("GET /products error")
    next(error);
  }
})


module.exports = productsRouter;
