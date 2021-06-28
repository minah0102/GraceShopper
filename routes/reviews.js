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

const {
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
} = require("../db/reviews");
const { requireUser, requireAdmin } = require("./utils");
const { getHistory } = require("../db/orders");

reviewsRouter.use((req, res, next) => {
  console.log("reviewsRouter is used");
  next();
});

reviewsRouter.post("/:productId", requireUser, async (req, res, next) => {
  console.log("HITTING IT");
  const { comment, rating } = req.body;
  const { productId } = req.params;
  const { id: userId } = req.user;
 
  // const pastOrders = await getHistory(userId);
  // const product = pastOrders.product.include()

  try {
    const newReview = await createReview({
      comment,
      rating,
      userId,
      productId
    });
    res.send(newReview);
  } catch (error) {
    console.log("postReview", error);
    next(error);
  }
});

reviewsRouter.patch("/:reviewId", requireUser, async (req, res, next) => {
  const { reviewId } = req.params;
  const { user } = req;
  const { comment, rating } = req.body;
  const updatingFields = {};
  const reviewToUpdate = await getReviewById(reviewId);
  if (comment) {
    updatingFields.comment = comment;
  }
  if (rating) {
    updatingFields.rating = rating;
  }
  if (user.id === reviewToUpdate.userId) {
    try {
      const updatedReview = await updateReview(reviewId, updatingFields);
      res.send(updatedReview);
    } catch (error) {
      console.log("updateReview", error);
      next(error);
    }
  } else {
    next(error);
  }
});

reviewsRouter.delete("/:reviewId", requireUser, async (req, res, next) => {
  const { reviewId } = req.params;
  const { user } = req;
  const reviewToDelete = await getReviewById(reviewId);
  if (user.id === reviewToDelete.userId) {
    try {
      const deletedReview = await deleteReview(reviewId);
      res.send(deletedReview);
    } catch (error) {
      console.log("deleteReview", error);
      next(error);
    }
  } else {
    next(error);
  }
});

module.exports = reviewsRouter;
