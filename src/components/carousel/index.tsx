import React, { memo, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { Carousel } from "antd";
import { MyCarouselWrap } from "./style";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";
import { useAppDispatch, useAppSelector } from "@/store";
import { changePicIndexAction, getImgAction } from "@/pages/AdaptAbli/store";
import { title } from "process";
import { BASE_URL } from "@/services/config";

interface Iprops {
  children?: ReactNode;
  workNum?: number;
  imgUrls: string[];
  sceneNum: number;
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
  const { workNum, imgUrls, sceneNum } = props;
  console.log("啥啊这是", imgUrls);

  const dispatch = useAppDispatch();

  const [currentSlide, setCurSlide] = useState(0);

  //   console.log("imgUrl1", pic1Url);
  const carouselRef = useRef<CarouselRef>(null);

  const audioRef0 = useRef<HTMLAudioElement>(null);
  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const audioRef3 = useRef<HTMLAudioElement>(null);
  const audioRef4 = useRef<HTMLAudioElement>(null);

  const audios = [audioRef0, audioRef1, audioRef2, audioRef3, audioRef4];
  const onChange = (from: number, to: number) => {
    // dispatch(getImgAction({ workIndex: workNum, picIndex: to }));
    dispatch(changePicIndexAction(to));
    console.log("currentSlide", to);
    // setCurSlide(to);
    if (sceneNum === 3) {
      audios[from].current?.pause();
    }
  };

  const carousel = (
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
    </Carousel>
  );

  return (
    <MyCarouselWrap isVoice={sceneNum === 3}>
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

      {/* {pageScene != "voice" ? (
        carousel
      ) : (
        <audio
          controls
          src="http://m8.music.126.net/20230404174528/e1262eceffcd6e6f3bf8565af1a81f4e/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
        ></audio>
      )} */}

      <Carousel beforeChange={onChange} dots={false} ref={carouselRef}>
        {imgUrls?.map((item, index) => {
          return (
            <div key={index}>
              {sceneNum !== 3 ? (
                <img
                  src={`data:image/png;base64,${item}`}
                  alt={`图片${currentSlide + 1}`}
                />
              ) : (
                <audio
                  controls
                  src={`${BASE_URL}/watch/` + item}
                  ref={audios[index]}
                />
              )}
            </div>
          );
        })}
      </Carousel>
    </MyCarouselWrap>
  );
};

export default memo(MyCarousel);
