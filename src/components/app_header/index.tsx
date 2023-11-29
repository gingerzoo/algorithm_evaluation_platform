import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { HeaderWrap } from "./style";
import { RadarChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { changeNextPathAction } from "@/pages/BasicConfig/store";

interface Iprops {
  children?: ReactNode;
  greenClickHandle: () => void;
}

const App_header: FC<Iprops> = (props) => {
  const { greenClickHandle } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const backToHome = () => {
    navigate("/home");
    dispatch(changeNextPathAction("/profile/config"));
  };
  return (
    <HeaderWrap>
      <div className="left" onClick={backToHome}>
        <div className="logo"></div>
        {/* <span className="divider">|</span> */}
        <h2 className="algor">
          {/* <RadarChartOutlined style={{ color: "#5692FC" }} /> */}
          &nbsp; 感知分级算法评估平台
        </h2>
      </div>

      <div className="right">
        {/* <div className="start btn" onClick={greenClickHandle}>
          新手引导
        </div>
        <span className="divider">|</span>
        <div className="history btn">历史评估</div>
        <span className="divider">|</span>
        <div className="report btn">报表导出</div>
        <span className="divider">|</span> */}
        <div className="backToHome btn" onClick={backToHome}>
          返回首页
        </div>
      </div>
    </HeaderWrap>
  );
};

export default memo(App_header);
