import React, { memo, useRef } from "react";
import type { FC, ReactNode } from "react";
import { PictureWrap } from "./style";
import { Carousel } from "antd";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { mockPic } from "@/assets/data/local_data";
import { useAppSelector } from "@/store";

interface Iprops {
  children?: ReactNode;
}

const Picture: FC<Iprops> = (props) => {
  const { imgUrls } = useAppSelector((state) => ({
    imgUrls: state.adaptAbili.imgUrl
  }));
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const carouselRef = useRef<CarouselRef>(null);
  return (
    <PictureWrap>
      <div className="slider">
        <Carousel afterChange={onChange} dots={false} ref={carouselRef}>
          {imgUrls.map((item) => {
            return (
              <div key={item} className="pic">
                <img src={`data:image/png;base64,${item}`} />;
              </div>
            );
          })}
        </Carousel>
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
    </PictureWrap>
  );
};

export default memo(Picture);
