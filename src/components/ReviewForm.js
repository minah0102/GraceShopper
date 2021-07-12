import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import StarRating from "./StarRating";
import { createReview } from "../api/reviews";
import { useParams } from "react-router-dom";

const ReviewForm = ({ productReviews, setProductReviews }) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  console.log(comment);

  const {id} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("OUR RATING", rating);
    if (rating === null) {
      alert("rate this!");
      return;
    }
    try {
      const { review: newReview } = await createReview(
        comment,
        rating,
        id,
        // userId
      );
      console.log("this");
      setProductReviews([...productReviews, newReview]);
      setRating(null);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <StarRating rating={rating} setRating={setRating} />
      </Form.Group>
      <Form.Group controlId="reviewComment">
        <Form.Control
          type="text"
          placeholder="Please share your experience with the product"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>{" "}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ReviewForm;
