import React from "react";
import { Container, Carousel } from "react-bootstrap";
import "./Home.css";
import aver from "../images/aver2.jpg";

const Home = () => {
  return (
    <Container className="home-container">
      <h1 style={{textAlign: "center"}}>Welcome to Catnip Corp.</h1>
      <Carousel>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={aver}
            alt="First Slide"
          />
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img className="d-block w-100"
            src={aver}
            alt="Second Slide"
          />
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img className="d-block w-100"
            src={aver}
            alt="Third Slide"
          />
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img className="d-block w-100"
            src={aver}
            alt="Fourth Slide"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  )
};

export default Home;