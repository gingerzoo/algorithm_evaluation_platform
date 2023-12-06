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
  changeState?: () => void;
}

const App_header: FC<Iprops> = (props) => {
  const { isDocker, children, procommandClickHandle } = props;
  const { curModule, sceneNum } = useAppSelector((state) => ({
    curModule: state.basicConfig.currentModule,
    sceneNum: state.basicConfig.sceneNum
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
    <UploadWrap
      notBrowser={sceneNum === 3 && !isDocker}
      isVoice={sceneNum === 3}
    >
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
      <button
        className="command"
        onClick={(e) => btnClickHandle(e)}
        disabled={sceneNum === 3 && !isDocker}
      >
        {isDocker ? "查看系统简况" : "浏览数据集样本"}
      </button>
    </UploadWrap>
  );
};

export default memo(App_header);
