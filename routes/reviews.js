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
const { requireUser } = require("./utils");
const { getHistory } = require("../db/orders");

reviewsRouter.use((req, res, next) => {
  console.log("reviewsRouter is use");
  next();
});

reviewsRouter.post("/:productId", requireUser, async (req, res, next) => {
  console.log("HITTING IT");
  const { comment, rating, userId } = req.body;
  const { productId } = req.params;
  const token = req.user.token;
  console.log(token)
  // // const { user } = req;
  // const pastOrders = await getHistory()
  try {
    // userId = user.id;
    const newReview = await createReview({
      comment,
      rating,
      userId,
      productId,
    });
    res.send(newReview);
  } catch (error) {
    console.log("postReview", error);
    next(error);
  }
});

module.exports = reviewsRouter;
