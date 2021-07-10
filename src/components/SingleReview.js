import React from "react";
// import { FaStarHalf } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const SingleReview = ({ singleReview }) => {
  const { id, comment, rating, username } = singleReview;
  return (
    <div key={id}>
      <h6>
        {rating} from {username}
      </h6>
      <p>{comment}</p>
      {/* <FaStarHalf icon="fa-solid fa-star-half-stroke" /> */}
    </div>
  );
};

export default SingleReview;
