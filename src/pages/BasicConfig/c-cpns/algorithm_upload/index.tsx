import React, { memo, MouseEventHandler, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { message, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeCurModuleAction,
  changeStatusCommAction,
  getAftDelAlgListAction,
  getAlogListAction,
  getDockerAction,
  getSystemAction
} from "../../store";
import { changeStatusBeAction } from "@/pages/BasicWork/store";
import Upload from "../upload";
import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";

interface Iprops {
  children?: ReactNode;
  commandClickHandle: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
  changeState?: () => void;
}

const AlgorithmUpload: FC<Iprops> = (props) => {
  const { commandClickHandle, changeState } = props;
  const { algorithmList } = useAppSelector((state) => ({
    algorithmList: state.basicConfig.algolist,
    curModule: state.basicConfig.currentModule,
    system_status: state.basicConfig.commit_status
  }));

  const inputRef = useRef<HTMLInputElement>(null);
  const eContRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();

  const options = algorithmList?.map((item) => {
    const optionItem = (
      <div className="optionItem">
        <span className="optionItem-name">{item}</span>
        <i className="delect-icon" onClick={(e) => deleteModelHandle(e, item)}>
          {/* <DeleteOutlined /> */}
          <DeleteFilled />
        </i>
      </div>
    );
    return {
      value: item,
      label: optionItem
    };
  });

  const deleteModelHandle = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    delete_name: string
  ) => {
    e.stopPropagation();
    console.log("the model to be deleted", delete_name);
    dispatch(getAftDelAlgListAction(delete_name)).then(() => {
      if (changeState) changeState();
    });
  };

  const handleSelect = (value: string) => {
    // console.log(value);
    dispatch(changeCurModuleAction(value));
    console.log("option被选择了", value);
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
      console.log("现在input框中被选中的压缩包", file);
      if (now instanceof File) {
        const name = now.name;
        // console.log(name);
        eContRef.current!.textContent = name;
      }
    }
  }

  function btnHandleClick() {
    inputRef.current?.click();
  }

  function submmitBtnClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.stopPropagation();
    // dispatch(getAlogListAction());
    console.log(inputRef.current?.files);
    if (inputRef.current?.files && inputRef.current.files.length > 0) {
      const file = inputRef.current.files[0];
      console.log("file", file);
      const formData = new FormData();
      formData.append("docker", file);
      console.log("formData", formData);
      //   console.log(formData.get("docker"));
      dispatch(getDockerAction(formData)).then(() => {
        if (changeState) changeState();
      });
    } else {
      message.open({
        type: "error",
        content: "请选择一个压缩文件",
        duration: 2
      });
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
          popupClassName={`select-item`}
          //   labelInValue={true}
          options={options}
        />
      </div>
    </>
  );

  return (
    <Upload
      isDocker={true}
      procommandClickHandle={commandClickHandle}
      changeState={changeState}
    >
      {girl}
    </Upload>
  );
};

export default memo(AlgorithmUpload);
