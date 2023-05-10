import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { HeaderWrap } from "./style";
import { RadarChartOutlined } from "@ant-design/icons";

interface Iprops {
  children?: ReactNode;
  greenClickHandle: () => void;
}

const App_header: FC<Iprops> = (props) => {
  const { greenClickHandle } = props;
  return (
    <HeaderWrap>
      <div className="left">
        <div className="logo"></div>
        {/* <span className="divider">|</span> */}
        <h3 className="algor">
          {/* <RadarChartOutlined style={{ color: "#5692FC" }} /> */}
          &nbsp;算法评估平台模型
        </h3>
      </div>
      <div className="right">
        <div className="start btn" onClick={greenClickHandle}>
          新手引导
        </div>
        <span className="divider">|</span>
        <div className="history btn">历史评估</div>
        <span className="divider">|</span>
        <div className="report btn">报表导出</div>
      </div>
    </HeaderWrap>
  );
};

export default memo(App_header);
