const express = require("express");
const { client } = require("../db");
const categoriesRouter = express.Router();
const {getAllCategories} = require('../db/categories')

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.send(categories);
  } catch (error) {
    console.error("GET /categories error")
    next(error)
  }
})

module.exports = categoriesRouter;