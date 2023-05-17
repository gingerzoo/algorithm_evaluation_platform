import React, { memo, useRef } from "react";
import type { FC, ReactNode } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeDataSetAction,
  changeStatusCommAction,
  getAlogListAction
} from "../../store";

import { changeStatusBeAction } from "@/pages/BasicWork/store";
import Upload from "../upload";

interface Iprops {
  children?: ReactNode;
  commandClickHandle: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
}

const DataUpload: FC<Iprops> = (props) => {
  const { commandClickHandle } = props;

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const eContRef = useRef<HTMLElement>(null);

  function btnClickHandle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    // console.log(browse, "让我看看谁被点了");
    commandClickHandle(e);
  }

  function inputHandleClick() {
    console.log("上传数据集");
    if (inputRef.current?.files) {
      const file = inputRef.current.files[0];
      const formData = new FormData();
      formData.append("docker", file);

      const now = formData.get("docker");
      if (now instanceof File) {
        const name = now.name;
        console.log(name);
        eContRef.current!.textContent = name;
      }
    }
  }

  function btnHandleClick() {
    inputRef.current?.click();
  }

  function submmitBtnClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();
    dispatch(getAlogListAction());
    if (inputRef.current?.files) {
      const file = inputRef.current.files[0];
      console.log("file", file);
      const formData = new FormData();
      formData.append("docker", file);
      console.log("formData", formData);
      console.log(formData.get("docker"));
      //   dispatch(getDockerAction(formData));
      console.log("提交数据集，需要接口");

      //需要接口！
    }
  }

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

  const son = (
    <>
      {" "}
      <div className="default-data">{dataset}</div>
      <div className="upload-data">
        <input
          type="file"
          className="docker"
          ref={inputRef}
          onInput={inputHandleClick}
        />
        <button onClick={btnHandleClick} className={"false-input"}>
          <i ref={eContRef}>从本地上传数据集</i>
          <span
            onClick={(e) => {
              submmitBtnClick(e);
            }}
          >
            上传
          </span>
        </button>
      </div>
    </>
  );

  return (
    <Upload isDocker={false} procommandClickHandle={commandClickHandle}>
      {son}
    </Upload>
  );
};

export default memo(DataUpload);
