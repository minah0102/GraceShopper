import React from "react";
import { Container, Carousel } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="home-container">
      <h1>Welcome to Catnip Corp.</h1>
      <h3>This is our home page.</h3>
      <Carousel>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={`/images/donate.jpeg`}
            alt="First Slide"
          />
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img className="d-block w-100"
            src={`/images/aver2.jpg`}
            alt="Second Slide"
          />
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img className="d-block w-100"
            src={`/images/aver2.jpg`}
            alt="third Slide"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  )
};

export default Home;