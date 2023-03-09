import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { ProcessWrap } from "./style";
import { DoubleRightOutlined, MenuOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/store";

interface Iprops {
  children?: ReactNode;
}

const HeaderProcess: FC<Iprops> = (props) => {
  const { nowProcess, system } = useAppSelector((state) => ({
    nowProcess: state.basicConfig.nowProcess,
    system: state.basicConfig.system
  }));
  return (
    <ProcessWrap>
      <MenuOutlined style={{ fontSize: "22px", color: "white" }} />

      <h3 className="title">{system ? `${system.model_name}` : "项目名称"}</h3>
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
    </ProcessWrap>
  );
};

export default memo(HeaderProcess);
