import React from "react";
import { Carousel } from "react-bootstrap";


const Home = () => {
  return (
    <div>
      <h1>Welcome to Catnip Corp.</h1>
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
    </div>
  )
};

export default Home;