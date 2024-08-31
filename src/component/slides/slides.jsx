import Carousel from "react-bootstrap/Carousel";
import Slide1 from "../../assets/slide1.jpg";
import Slide2 from "../../assets/Slide2.png";
import Slide3 from "../../assets/slide3.png";
import Slide4 from "../../assets/slide4.png";
import "./slide.css";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
export default function Slide() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  });
  return (
    <div>
      <div className="headerSlide">
        {isLoading ? (
          <Skeleton
            className="imgSkelton mt-0"
            height={400}
            width={1200}
            variant="rectangular"
          />
        ) : (
          <Carousel>
            <Carousel.Item className="carousel-item">
              <img src={Slide3} alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={Slide2} alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={Slide1} alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={Slide4} alt="" />
            </Carousel.Item>
          </Carousel>
        )}
      </div>
    </div>
  );
}
