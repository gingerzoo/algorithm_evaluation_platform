import React, { memo, useRef } from "react";
import type { FC, ReactNode } from "react";
import { Carousel } from "antd";
import { MyCarouselWrap } from "./style";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";

interface Iprops {
  children?: ReactNode;
}
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "360px",
  color: "#fff",
  lineHeight: "360px",
  textAlign: "center",
  background: "#364d79"
};

const MyCarousel: FC<Iprops> = (props) => {
  const carouselRef = useRef<CarouselRef>(null);
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <MyCarouselWrap>
      <div className="switch-pic">
        <button
          className="left-btn slider-control"
          onClick={() => {
            carouselRef.current?.prev();
          }}
        >
          <CaretLeftFilled />
        </button>
        <button
          className="right-btn slider-control"
          onClick={() => {
            carouselRef.current?.next();
          }}
        >
          <CaretRightFilled />
        </button>
      </div>

      <Carousel afterChange={onChange} dots={false} ref={carouselRef}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </MyCarouselWrap>
  );
};

export default memo(MyCarousel);
