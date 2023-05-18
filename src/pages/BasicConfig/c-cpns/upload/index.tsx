import React, { memo, useRef } from "react";
import type { FC, ReactNode } from "react";
import { UploadWrap } from "./style";
import { SwitcherFilled } from "@ant-design/icons";
import { useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";

interface Iprops {
  children?: ReactNode;
  isDocker: boolean;
  procommandClickHandle: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
}

const App_header: FC<Iprops> = (props) => {
  const { isDocker, children, procommandClickHandle } = props;
  const { curModule } = useAppSelector((state) => ({
    curModule: state.basicConfig.currentModule
  }));

  const navigate = useNavigate();

  //bigBox最下面的按钮
  function btnClickHandle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    procommandClickHandle(e);
  }

  function bigBoxHandle() {
    if (!isDocker) {
      navigate("/profile/dataset");
    }
  }

  return (
    <UploadWrap>
      <div className="big-box" onClick={bigBoxHandle}>
        <span className="icon">
          <SwitcherFilled style={{ fontSize: "22px", color: "teal" }} />
        </span>
        {isDocker ? (
          <p className="title">
            {curModule ? `当前模型为：${curModule}` : "选择算法模型"}
          </p>
        ) : (
          <p className="title">选择数据集路径</p>
        )}
        <div className="select">{children}</div>
      </div>
      <span className="command" onClick={(e) => btnClickHandle(e)}>
        {isDocker ? "查看系统简况" : "浏览数据集样本"}
      </span>
    </UploadWrap>
  );
};

export default memo(App_header);
