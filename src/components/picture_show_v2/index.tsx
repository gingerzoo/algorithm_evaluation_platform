import React, { memo, useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { PictureWrap } from "./style";
import {
  CaretLeftFilled,
  CaretRightFilled,
  RocketTwoTone
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeCoordinateAction,
  getChangeCoorAction,
  getDataImgInfoAction
} from "@/pages/BasicConfig/store";
import { failedMessage } from "@/utils/message";

interface Iprops {
  children?: ReactNode;
}

const Picture: FC<Iprops> = (props) => {
  const { imgInfo, curCoor, sceneNum } = useAppSelector((state) => ({
    imgInfo: state.basicConfig.pic_info,
    curCoor: state.basicConfig.coordinate,
    sceneNum: state.basicConfig.sceneNum
  }));

  const { img, coor, num_all, status } = imgInfo;

  const [imgIndex, setImgIndex] = useState(0);
  const [needSetCoor, setNeedSetCoor] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     console.log("图片预览发送了图片请求！！！！！！！！");
  //     dispatch(getDataImgInfoAction(imgIndex));
  //   }, [imgIndex]);

  const changeStatusHandle = () => {
    setNeedSetCoor(!needSetCoor);
  };

  const changeCoorHandle = () => {
    if (inputRef.current) {
      console.log("现在的坐标", inputRef.current.value);
      const curValue = inputRef.current.value
        .split(",")
        .map((item) => parseFloat(item));
      if (curValue.length !== 4) {
        failedMessage("输入格式不正确");
      } else {
        dispatch(getChangeCoorAction({ imgIndex, coor: curValue }));
        dispatch(changeCoordinateAction(curValue));
        setNeedSetCoor(false);
      }
    }
  };

  return (
    <PictureWrap>
      <div className="slider">
        <div className="pic">
          {/* <img src="../../assets/images/0.jpg" />; */}
          <img src={`data:image/png;base64,${img}`} />
        </div>
        <button
          className="left-btn slider-control"
          onClick={() => {
            if (imgIndex > 0) {
              setImgIndex(imgIndex - 1);
              dispatch(getDataImgInfoAction(imgIndex - 1));
            } else {
              setImgIndex(num_all - 1);
              dispatch(getDataImgInfoAction(num_all - 1));
            }
          }}
        >
          <CaretLeftFilled />
        </button>
        <button
          className="right-btn slider-control"
          onClick={() => {
            if (imgIndex >= num_all - 1) {
              setImgIndex(0);
              dispatch(getDataImgInfoAction(0));
            } else {
              setImgIndex(imgIndex + 1);
              dispatch(getDataImgInfoAction(imgIndex + 1));
            }
          }}
        >
          <CaretRightFilled />
        </button>
        {status === 0 && sceneNum == 2 && (
          <div className="data_coor">
            <h3 className="pic_index">图片{imgIndex + 1}</h3>

            {coor.map((item, index) => {
              return (
                <div key={index} className="data_info_all">
                  <h4>
                    <RocketTwoTone />
                    目标{index + 1}
                  </h4>
                  <div className="data_info mar">
                    <span>类别：{item.class_name}</span>
                    <div className="coordinate mar">
                      <span>坐标：{curCoor.join(",")}</span>
                      {!needSetCoor && (
                        <a onClick={changeStatusHandle}>修改坐标?</a>
                      )}
                    </div>
                    {needSetCoor && (
                      <div className="set-coor">
                        <input
                          placeholder='输入修改后的坐标，以","为分隔符'
                          type="text"
                          ref={inputRef}
                        />
                        <button className="sure" onClick={changeCoorHandle}>
                          确认修改
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PictureWrap>
  );
};

export default memo(Picture);
