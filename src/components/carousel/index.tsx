import React, { memo, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { Carousel } from "antd";
import { MyCarouselWrap } from "./style";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { useAppDispatch, useAppSelector } from "@/store";
import { changePicIndexAction, getImgAction } from "@/pages/AdaptAbli/store";
import { title } from "process";

interface Iprops {
  children?: ReactNode;
  workNum: number;
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
  const { workNum } = props;
  const { imgUrl } = useAppSelector((state) => ({
    imgUrl: state.adaptAbili.imgUrl
  }));

  const dispatch = useAppDispatch();

  const [currentSlide, setCurSlide] = useState(0);
  const [pic1Url, setPic1] = useState(imgUrl);
  const [pic1Ur2, setPic2] = useState("");
  const [pic1Ur3, setPic3] = useState("");
  const [pic1Ur4, setPic4] = useState("");
  const [pic1Ur5, setPic5] = useState("");
  const carouselRef = useRef<CarouselRef>(null);
  const onChange = (currentSlide: number) => {
    console.log("currentSlide", currentSlide);
    setCurSlide(currentSlide);
    dispatch(changePicIndexAction(currentSlide));
    dispatch(getImgAction({ workIndex: workNum, picIndex: currentSlide })).then(
      (res) => {
        if (getImgAction.fulfilled.match(res)) {
          switch (currentSlide) {
            case 0:
              setPic1(res.payload.baseUrl);
              break;
            case 1:
              setPic2(res.payload.baseUrl);
              break;
            case 2:
              setPic3(res.payload.baseUrl);
              break;
            case 3:
              setPic4(res.payload.baseUrl);
              break;
            case 4:
              setPic5(res.payload.baseUrl);
              break;
            default:
              break;
          }
        }
      }
    );
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
        {/* {new Array(5).map((item, index) => {
          return (
            <div>
              <img
                src={`data:image/png;base64,${pic1Url}`}
                alt={`图片${currentSlide + 1}`}
              ></img>
            </div>
          );
        })} */}
        <div>
          <img
            src={`data:image/png;base64,${pic1Url}`}
            alt={`图片${currentSlide + 1}`}
          ></img>
        </div>
        <div>
          <img
            src={`data:image/png;base64,${pic1Ur2}`}
            alt={`图片${currentSlide + 1}`}
          ></img>
        </div>
        <div>
          <img
            src={`data:image/png;base64,${pic1Ur3}`}
            alt={`图片${currentSlide + 1}`}
          ></img>
        </div>
        <div>
          <img
            src={`data:image/png;base64,${pic1Ur4}`}
            alt={`图片${currentSlide + 1}`}
          ></img>
        </div>
        <div>
          <img
            src={`data:image/png;base64,${pic1Ur5}`}
            alt={`图片${currentSlide + 1}`}
          ></img>
        </div>
      </Carousel>
    </MyCarouselWrap>
  );
};

export default memo(MyCarousel);
