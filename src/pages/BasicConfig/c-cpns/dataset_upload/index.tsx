import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { SwitcherFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeDataSetAction, changeStatusCommAction } from "../../store";
import { UploadWrap } from "../docker_upload/style";
import { changeStatusBeAction } from "@/pages/BasicWork/store";

interface Iprops {
  children?: ReactNode;
  commandClickHandle: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
}

const DataUpload: FC<Iprops> = (props) => {
  const { commandClickHandle } = props;

  function btnClickHandle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    // console.log(browse, "让我看看谁被点了");
    commandClickHandle(e);
  }

  const dispatch = useAppDispatch();

  const dataset = ["RGB图像", "NIR图像", "Radar图像"].map((item, index) => {
    const { dataset } = useAppSelector((state) => ({
      dataset: state.basicConfig.dataSet
    }));
    const dispatch = useAppDispatch();
    return (
      <button
        key={item}
        className={["dataset-type", dataset == index ? "selected" : ""].join(
          " "
        )}
        onClick={(e) => {
          console.log(e.target);
          dispatch(changeDataSetAction(index));
          dispatch(changeStatusCommAction(-1));
          dispatch(changeStatusBeAction(-1));
        }}
      >
        {item}
      </button>
    );
  });

  return (
    <UploadWrap>
      <div className="big-box">
        <span className="icon">
          <SwitcherFilled style={{ fontSize: "22px", color: "#0077FA" }} />
        </span>
        <p className="title">选择数据集路径</p>
        <p className="datasets">{dataset}</p>
      </div>
      <span className="command" onClick={(e) => btnClickHandle(e)}>
        浏览数据集样本
      </span>
    </UploadWrap>
  );
};

export default memo(DataUpload);
