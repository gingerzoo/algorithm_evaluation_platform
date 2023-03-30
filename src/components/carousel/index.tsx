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
  const { imgUrls } = useAppSelector((state) => ({
    imgUrls: state.adaptAbili.imgUrl
  }));

  const dispatch = useAppDispatch();

  const [currentSlide, setCurSlide] = useState(0);

  //   console.log("imgUrl1", pic1Url);
  const carouselRef = useRef<CarouselRef>(null);
  const onChange = (from: number, to: number) => {
    // dispatch(getImgAction({ workIndex: workNum, picIndex: to }));
    dispatch(changePicIndexAction(to));
    console.log("currentSlide", to);
    // setCurSlide(to);

    // dispatch(getImgAction({ workIndex: workNum, picIndex: currentSlide })).then(
    //   (res) => {
    //     if (getImgAction.fulfilled.match(res)) {
    //       console.log("我有回音了！");
    //       console.log(res);
    //       switch (currentSlide) {
    //         case 0:
    //           setPic1((res.payload as any).baseUrl);
    //           break;
    //         case 1:
    //           setPic2((res.payload as any).baseUrl);
    //           break;
    //         case 2:
    //           setPic3((res.payload as any).baseUrl);
    //           break;
    //         case 3:
    //           setPic4((res.payload as any).baseUrl);
    //           break;
    //         case 4:
    //           setPic5((res.payload as any).baseUrl);
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //   }
    // );
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

      <Carousel beforeChange={onChange} dots={false} ref={carouselRef}>
        {imgUrls?.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={`data:image/png;base64,${item}`}
                alt={`图片${currentSlide + 1}`}
              ></img>
            </div>
          );
        })}
        {/* <div>
          <img
            src={`data:image/png;base64,${imgUrl}`}
            alt={`图片${currentSlide + 1}`}
          ></img>
        </div>
        <div>
          <img
            src={`data:image/png;base64,${imgUrl}`}
            alt={`图片${currentSlide + 1}`}
          ></img>
        </div>
        <div>
          <img
            src={`data:image/png;base64,${imgUrl}`}
            alt={`图片${currentSlide + 1}`}
          ></img>
        </div>
        <div>
          <img
            src={`data:image/png;base64,${imgUrl}`}
            alt={`图片${currentSlide + 1}`}
          ></img>
        </div>
        <div>
          <img
            src={`data:image/png;base64,${imgUrl}`}
            alt={`图片${currentSlide + 1}`}
          ></img>
        </div> */}
      </Carousel>
    </MyCarouselWrap>
  );
};

export default memo(MyCarousel);
