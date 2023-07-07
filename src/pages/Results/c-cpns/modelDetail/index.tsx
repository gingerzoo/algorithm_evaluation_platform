import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { ModelDetailWrap } from "./style";
import { res_measurement } from "@/assets/data/local_data";
import { HighlightTwoTone, SnippetsOutlined } from "@ant-design/icons";

interface Iprops {
  children: ReactNode;
  model_name: string;
  model_index: number;
  model_desribe: string;
}

const ModelDetail: FC<Iprops> = ({
  model_name,
  model_index,
  children,
  model_desribe
}) => {
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
        <p>{model_desribe}</p>
      </div>
    </ModelDetailWrap>
  );
};

export default memo(ModelDetail);
