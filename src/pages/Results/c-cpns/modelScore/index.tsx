import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { ModelScoreWrap } from "./style";
import { Rate } from "antd";
import { SmileTwoTone } from "@ant-design/icons";

interface Iprops {
  children: ReactNode;
  name: string;
  score: number;
}

const ModelScore: FC<Iprops> = ({ name, score, children }) => {
  return (
    <ModelScoreWrap>
      <div className="top">
        <div className="icon_name">
          <SmileTwoTone />
          <span className="model_name">{name}</span>
        </div>
        <div className="rate">
          <Rate value={score} disabled />
        </div>
      </div>
      <p className="desc">{children}</p>
    </ModelScoreWrap>
  );
};

export default memo(ModelScore);
