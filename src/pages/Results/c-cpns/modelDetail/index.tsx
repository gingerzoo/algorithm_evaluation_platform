import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { ModelDetailWrap } from "./style";
import { res_measurement } from "@/assets/data/local_data";
import { HighlightTwoTone, SnippetsOutlined } from "@ant-design/icons";

interface Iprops {
  children: ReactNode;
  model_name: string;
  model_index: number;
}

const ModelDetail: FC<Iprops> = ({ model_name, model_index, children }) => {
  return (
    <ModelDetailWrap>
      <div className="model_header">
        <span className="icon_index">{model_index}</span>
        <span className="model_name">{model_name}</span>
      </div>
      <div className="chart">{children}</div>
      <div className="explain">
        <div className="explain_name">
          <HighlightTwoTone twoToneColor="teal" />
          <span>{model_name}解释</span>
        </div>
        <p>
          这是一段解释这是一段解释这是一段解释这是一段解释这是一段解释这是一段解释这是一段解释这是一段解释这是一段解释
        </p>
      </div>
    </ModelDetailWrap>
  );
};

export default memo(ModelDetail);
