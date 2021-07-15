import React, { useContext } from "react";
import { UserContext } from "..";
import { Card, Button } from "react-bootstrap";
import { deleteReview } from "../api/reviews";
import SingleRating from "./SingleRating";



const SingleReview = ({ singleReview, currentProduct, setCurrentProduct }) => {
  const { currentUsername, user } = useContext(UserContext);
  const { id, comment, rating, username } = singleReview;

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleted = await deleteReview(id);
    const newProduct = { ...currentProduct };
    let newRA = currentProduct.reviews.filter(
      (review) => review.id !== deleted.id
    );
    newProduct.reviews = [...newRA];
    setCurrentProduct(newProduct);
    console.log(deleted);
  };

  return (
    <Card key={id} style={{ width: "55em", height: "10em" }}>
      <Card.Title>
        <SingleRating singleReview={singleReview}/>
        {currentUsername === username || user.isAdmin === true ? (
          <Button variant="danger" onClick={handleDelete}>
            delete
          </Button>
        ) : (
          ""
        )}
      </Card.Title>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{comment}</p>
          <footer className="blockquote-footer">from {username}</footer>{" "}
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default SingleReview;
