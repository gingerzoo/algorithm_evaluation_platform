import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { ProcessWrap } from "./style";
import { DoubleRightOutlined, MenuOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/store";
import { subs } from "@/assets/data/local_data";

interface Iprops {
  children?: ReactNode;
}

const HeaderProcess: FC<Iprops> = (props) => {
  const { nowProcess, system, sceneNum, isSelected } = useAppSelector(
    (state) => ({
      nowProcess: state.basicConfig.nowProcess,
      system: state.basicConfig.system,
      sceneNum: state.basicConfig.sceneNum,
      isSelected: state.basicConfig.selected
    })
  );

  console.log("scene___num", sceneNum);

  return (
    <ProcessWrap>
      <MenuOutlined style={{ fontSize: "22px ", color: "white" }} />

      <h3 className="title">
        {system.model_name ? `${system.model_name}` : "我的项目名称"}
      </h3>
      <div className="left">
        <div className="process">
          {nowProcess.map((item, index) => {
            return (
              <span key={index}>
                {item}
                <DoubleRightOutlined />
              </span>
            );
          })}
        </div>
        <span>
          {isSelected ? "已选场景" : "默认场景"} : {subs[sceneNum].title}
        </span>
      </div>
    </ProcessWrap>
  );
};

export default memo(HeaderProcess);
