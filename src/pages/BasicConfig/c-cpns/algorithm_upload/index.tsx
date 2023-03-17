import React, { memo, MouseEventHandler } from "react";
import type { FC, ReactNode } from "react";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { UploadWrap } from "../docker_upload/style";
import {
  changeCurModuleAction,
  changeStatusCommAction,
  getSystemAction
} from "../../store";
import { SwitcherFilled } from "@ant-design/icons";
import { changeStatusBeAction } from "@/pages/BasicWork/store";

interface Iprops {
  children?: ReactNode;
  commandClickHandle: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
}

const AlgorithmUpload: FC<Iprops> = (props) => {
  const { algorithmList, curModule } = useAppSelector((state) => ({
    algorithmList: state.basicConfig.algolist,
    curModule: state.basicConfig.currentModule
  }));

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
    dispatch(getSystemAction(value));
    dispatch(changeStatusCommAction(-1));
    dispatch(changeStatusBeAction(-1));
  };

  function btnClickHandle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    // console.log(browse, "让我看看谁被点了");
    props.commandClickHandle(e);
  }

  return (
    <UploadWrap>
      <div className="big-box">
        <span className="icon">
          <SwitcherFilled style={{ fontSize: "22px", color: "#0077FA" }} />
        </span>
        <p className="title">
          {curModule ? `当前模型为：${curModule}` : "选择算法模型"}
        </p>

        <Select
          style={{ width: "70%" }}
          placeholder="选择算法"
          onSelect={handleSelect}
          options={options}
        />
      </div>
      <span className="command" onClick={(e) => btnClickHandle(e)}>
        查看系统简况
      </span>
    </UploadWrap>
  );
};

export default memo(AlgorithmUpload);
