import React, { memo, useRef } from "react";
import type { FC, ReactNode } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeDataSetAction,
  changeStatusCommAction,
  getAlogListAction
} from "../../store";

import Upload from "../upload";
import { changeBasicStatusAction } from "@/pages/BasicWork/store";

interface Iprops {
  children?: ReactNode;
  commandClickHandle: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
}

const DataUpload: FC<Iprops> = (props) => {
  const { commandClickHandle } = props;
  const { sceneNum } = useAppSelector((state) => ({
    sceneNum: state.basicConfig.sceneNum
  }));

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const eContRef = useRef<HTMLElement>(null);

  function inputHandleClick(e: React.FormEvent<HTMLInputElement>) {
    e.stopPropagation();
    // e.preventDefault();
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

  function btnHandleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
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
          e.stopPropagation();
          dispatch(changeDataSetAction(index));
          dispatch(changeStatusCommAction(-1));
          dispatch(changeBasicStatusAction(-1));
        }}
        disabled={sceneNum === 3}
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
          onClick={(e) => e.preventDefault()}
          onInput={(e) => {
            inputHandleClick(e);
          }}
        />
        <button
          onClick={(e) => {
            btnHandleClick(e);
          }}
          className={"false-input"}
        >
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
