import carrusel1 from "./../img/banner.png";
import { Carousel } from "react-bootstrap";
import { Component } from "react";

import "./../css/carrusel.css";
import "bootstrap/js/dist/carousel.js";
import "bootstrap/dist/css/bootstrap.css";

class Carrusel extends Component {
  render() {
    return (
      <div id="carrusel">
        <Carousel>
          <Carousel.Item>
            <img src={carrusel1} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={carrusel1} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={carrusel1} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Carrusel;
