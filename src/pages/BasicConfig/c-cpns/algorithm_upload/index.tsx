import React, { memo, MouseEventHandler, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeCurModuleAction,
  changeStatusCommAction,
  getAlogListAction,
  getDockerAction,
  getSystemAction
} from "../../store";
import { changeStatusBeAction } from "@/pages/BasicWork/store";
import Upload from "../upload";

interface Iprops {
  children?: ReactNode;
  commandClickHandle: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
}

const AlgorithmUpload: FC<Iprops> = (props) => {
  const { commandClickHandle } = props;
  const { algorithmList, curModule, system_status } = useAppSelector(
    (state) => ({
      algorithmList: state.basicConfig.algolist,
      curModule: state.basicConfig.currentModule,
      system_status: state.basicConfig.commit_status
    })
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const eContRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();
  const options = algorithmList.map((item) => {
    return {
      value: item,
      label: item
    };
  });

  const handleSelect = (value: string) => {
    // console.log(value);
    dispatch(changeCurModuleAction(value));
    console.log("value--", value);
    dispatch(getSystemAction(value));
    dispatch(changeStatusCommAction(-1));
    dispatch(changeStatusBeAction(-1));
  };

  function inputHandleClick() {
    console.log("此处上传docker包");
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
      dispatch(getDockerAction(formData));
      console.log("提交docker包");
    }
  }

  const girl = (
    <>
      {" "}
      <input
        type="file"
        className="docker"
        ref={inputRef}
        onInput={inputHandleClick}
      />
      <button onClick={btnHandleClick} className={"false-input"}>
        <i ref={eContRef}> 选择docker包</i>
        <span
          onClick={(e) => {
            submmitBtnClick(e);
          }}
        >
          上传
        </span>
      </button>
      <div className="select-box">
        <Select
          style={{ width: "100%" }}
          placeholder="选择算法"
          onSelect={handleSelect}
          options={options}
        />
      </div>
    </>
  );

  return (
    <Upload isDocker={true} procommandClickHandle={commandClickHandle}>
      {girl}
    </Upload>
  );
};

export default memo(AlgorithmUpload);
