import axios from "axios";

export async function createReview(comment, rating, productId) {
  try {
    const { data } = await axios.post(`api/reviews/${productId}`, {
      comment: comment,
      rating: rating,
      productId: productId,
      // userId: userId,
    });
    console.log("leaveReview", data);
    return data;
  } catch (error) {
    console.log("error fetching create a review", error);
  }
}

// export async function updateReview({newRating, newComment}) {
//   try {
//     const { updatedReview } = await axios.patch(`/api/reviews/${reviewId}`, {
      
//     });
//     return updatedReview;
//   } catch (error) {
//     console.log("error fetching update review", error);
//   }
// }
