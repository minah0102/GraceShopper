// REVIEWS
// POST /reviews/:productId
// - posts one review to product
// - must be logged in
// - purchased product
// PATCH /reviews/:reviewId
// - edit one review
// - check is user id matches author id
// DELETE /reviews/:reviewId
// - admin too
// - deletes one review
// - check is user id matches author id

const express = require("express");
const reviewsRouter = express.Router();

const { createReview, updateReview, deleteReview } = require("../db/reviews");

reviewsRouter.post("/", async (req, res, next) => {
  try {
      const newReview = await createReview()

  } catch (error) {
    console.log("postReview", error);
    next(error);
  }
});

module.exports = reviewsRouter;
