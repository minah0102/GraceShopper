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
const { requireUser, requireAdmin } = require("./utils");

reviewsRouter.post("/:productId", requireUser, async (req, res, next) => {
  const { comment, rating } = req.body;
  const { productId } = req.params;
  const { userId } = req.user.id;

  try {
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

  //  else {
  //   next({
  //     error: "User doesn't match the author",
  //     message: "You can't perform this action",
  //   });
});

module.exports = reviewsRouter;
