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
    console.log("reviewDB", error);
  }
};

module.exports = {
  createReview,
};
