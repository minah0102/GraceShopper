import React from "react";
import { SingleReview } from "./index.js";
const Reviews = ({ currentProduct }) => {
  const { reviews } = currentProduct;
  return (
    <div>
      {reviews &&
        reviews.map((review) => {
          return <SingleReview key={review.id} singleReview={review} />;
        })}
    </div>
  );
};

export default Reviews;
