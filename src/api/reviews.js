import axios from "axios";
import { getTokenConfig } from "./token";

export async function createReview({ comment, rating, productId }) {
  console.log("PRODUCT-ID", productId);
  const { token } = getTokenConfig();
  console.log("TOKEN", token)

  try {
    const { data } = await axios.post(
      `/api/reviews/${productId}`,
      {
        comment: comment,
        rating: rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
