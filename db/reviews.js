const client = require("./client");

const createReview = async ({ comment, rating, userId, productId }) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
        INSERT INTO reviews(comment, rating, "userId", "productId")
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
      [comment, rating, userId, productId]
    );
    return review;
  } catch (error) {
    console.log("createReviewDB", error);
  }
};

const updateReview = async (reviewId, fields = {}) => {
  const updatingFields = Object.keys(fields).map((key, index) => {
    `"${key}"=$${index + 1}`.join(", ");
  });
  try {
    if (updatingFields.length > 0) {
      await client.query(
        `
        UPDATE reviews
        SET ${updatingFields}
        WHERE id=${reviewId}
        RETURNING *;
        `,
        [Object.values(fields)]
      );
    }
  } catch (error) {
    console.log("updateReviewDB", error);
  }
};

const deleteReview = async (reviewId) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
  DELETE from reviews
  WHERE id=1
  RETURNING *;
  `,
      [reviewId]
    );
    return review;
  } catch (error) {
    console.log("deleteReviewDB", error);
  }
};


module.exports = {
  createReview,
  updateReview,
  deleteReview,
};
