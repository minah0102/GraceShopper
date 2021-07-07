import axios from "axios";

export async function createReview({ comment, rating, productId, userId }) {
  try {
    const { data } = await axios.post(`/api/reviews/${productId}`, {
      comment: comment,
      rating: rating,
      productId: productId,
      userId: userId,
    });
    console.log("leaveReview", data);
    return data;
  } catch (error) {
    console.log("error fetching create a review", error);
  }
}
