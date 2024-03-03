import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { HeaderWrap, HistoryModalWrap } from "./style";
import { DashboardFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeNextPathAction } from "@/pages/BasicConfig/store";
import App_cover from "../app_cover";
import { Button, Modal } from "antd";
import {
  getHistoryListAction,
  getModelHistoryListAction
} from "@/pages/Home/store";

interface Iprops {
  children?: ReactNode;
  greenClickHandle: () => void;
}

const App_header: FC<Iprops> = (props) => {
  const { greenClickHandle } = props;
  const { historyList } = useAppSelector((state) => ({
    historyList: state.home.allHistory.allResult
  }));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //是否点击了历史评估的按钮
  const [isHistory, setIsHistory] = useState(false);

  const backToHome = () => {
    navigate("/home");
    dispatch(changeNextPathAction("/profile/config"));
  };

  const historyBtnClick = () => {
    setIsHistory(true);
    dispatch(getHistoryListAction());
  };

  const handleOk = () => {
    setIsHistory(false);
  };

  const handleCancel = () => {
    setIsHistory(false);
  };

  const historyItemClick = (modelName: string) => {
    console.log("点我了！！！！！！！！", modelName);
    dispatch(getModelHistoryListAction(modelName));
    setIsHistory(false);
    navigate("/profile/result");
  };

  return (
    <HeaderWrap>
      <div className="header-content">
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
          <div className="history btn" onClick={historyBtnClick}>
            历史评估
          </div>
          <span className="divider">|</span>
          <div className="backToHome btn" onClick={backToHome}>
            返回首页
          </div>
        </div>
      </div>
      <Modal
        title="历史评估"
        open={isHistory}
        onCancel={handleCancel}
        centered={true}
        footer={null}
        width={"35vw"}
      >
        <p>
          <DashboardFilled />
          可选历史模型:
        </p>
        <HistoryModalWrap>
          {historyList.map((item) => {
            return (
              <Button
                key={item}
                className="btn"
                onClick={() => {
                  historyItemClick(item);
                }}
              >
                {item}
              </Button>
            );
          })}
        </HistoryModalWrap>
      </Modal>
    </HeaderWrap>
  );
};

export default memo(App_header);
