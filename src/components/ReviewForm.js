import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import StarRating from "./StarRating";
import { createReview } from "../api/reviews";

const ReviewForm = ({ productReviews, setProductReviews }) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  console.log(comment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { review: newReview } = await createReview(
        comment,
        rating,
        // productId,
        // userId
      );
      console.log("this",);
      setProductReviews([...productReviews, newReview]);
      setRating(null);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form>
      <StarRating />
      <Form.Group controlId="reviewComment">
        {/* <Form.Label>Comment</Form.Label> */}
        <Form.Control
          type="text"
          placeholder="Please share your experience with the product"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>{" "}
      <Button variant="primary" type="submit" onSubmit={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default ReviewForm;