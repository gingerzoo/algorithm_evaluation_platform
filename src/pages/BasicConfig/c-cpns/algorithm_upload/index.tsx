import React, { memo, MouseEventHandler, useRef } from "react";
import type { FC, ReactNode } from "react";
import { Select } from "antd";
import { SwitcherFilled } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeCurModuleAction,
  changeStatusCommAction,
  changeSystemAction,
  getDockerAction,
  getSystemAction
} from "../../store";
import { changeStatusBeAction } from "@/pages/BasicWork/store";
import { AlgorWrap } from "./style";

interface Iprops {
  children?: ReactNode;
  commandClickHandle: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
}

const AlgorithmUpload: FC<Iprops> = (props) => {
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

  function btnClickHandle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    // console.log(browse, "让我看看谁被点了");
    props.commandClickHandle(e);
  }

  function inputHandleClick() {
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
    if (inputRef.current?.files) {
      const file = inputRef.current.files[0];
      console.log("file", file);
      const formData = new FormData();
      formData.append("docker", file);
      console.log("formData", formData);
      console.log(formData.get("docker"));
      dispatch(getDockerAction(formData));
    }
    // dispatch(changejSystemAction("hi"));
  }

  return (
    <AlgorWrap>
      <div className="big-box">
        <span className="icon">
          <SwitcherFilled style={{ fontSize: "22px", color: "teal" }} />
        </span>
        <p className="title">
          {curModule ? `当前模型为：${curModule}` : "选择算法模型"}
        </p>
        <div className="select">
          <div className="docker-box">
            <input
              type="file"
              className="docker"
              ref={inputRef}
              //   placeholder="选择docker包"
              onInput={inputHandleClick}
            />
            <button onClick={btnHandleClick}>
              <i ref={eContRef}> 选择docker包</i>
              <span
                onClick={(e) => {
                  submmitBtnClick(e);
                }}
              >
                上传
              </span>
            </button>

            {/* <p className="title">
              {system_status == 0 ? "docker包加载成功" : "加载docker镜像包"}
            </p> */}
          </div>
          <div className="divider"></div>
          <div className="select-box">
            <Select
              style={{ width: "100%" }}
              placeholder="选择算法"
              onSelect={handleSelect}
              options={options}
            />
          </div>
        </div>
      </div>
      <span className="command" onClick={(e) => btnClickHandle(e)}>
        查看系统简况
      </span>
    </AlgorWrap>
  );
};

export default memo(AlgorithmUpload);
