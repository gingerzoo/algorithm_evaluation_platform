import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { BasicResWrap } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeNextPathAction, changeNowProcessAction } from "../../store";
import { useNavigate } from "react-router-dom";
import Typewriter from "../typewriter";
import { basicResList } from "@/assets/data/local_data";
import { Progress, Space } from "antd";
import { IbasicRes } from "@/type";
// import WorkIntro from "../../../";
// import WorkNav from "../BasicWork/c-cpns/Nav";
// import WorkRemote from "../BasicWork/c-cpns/Remote";
// import WorkVoice from "../BasicWork/c-cpns/Voice";

interface Iprops {
  children?: ReactNode;
}

const BasicResult: FC<Iprops> = (props) => {
  const { run_status, sceneNum, scene, isPending, basic_result } =
    useAppSelector((state) => ({
      run_status: state.basicEffect.run_status,
      sceneNum: state.basicConfig.sceneNum,
      isPending: state.basicEffect.isPending,
      scene: state.basicConfig.scene,
      basic_result: state.basicEffect
    }));

  const curResult = basic_result[scene] as IbasicRes;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const color = ["#73C0DE", "#7496d2", "#ecd472"];

  //下一步按钮点击处理函数
  function nextBtnClick() {
    const nextPath = `/profile/adapt/${scene}`;
    dispatch(changeNextPathAction(nextPath));
    dispatch(changeNowProcessAction(["基础设置", "基础效能"]));

    navigate(nextPath);
  }
  return (
    <BasicResWrap>
      <div className="result">
        <h4 className="header">基础效能测试结果</h4>
        <div className="content">
          <div className="left">
            {basicResList[sceneNum].map((item, index) => (
              <div key={index} className="result_item">
                <div className="name">{item}</div>
                <Progress
                  percent={curResult["score"][index]}
                  status={curResult["status"][index] ? "success" : "exception"}
                  showInfo={true}
                  //   strokeColor={{
                  //     from: color[index * 2],
                  //     to: color[index * 2 + 1]
                  //   }}
                  strokeColor={color[index]}
                  format={(percent) => `${percent}`}
                  strokeWidth={12}
                />
              </div>
            ))}
          </div>
          <Space className="right">
            <Progress
              type="circle"
              percent={70}
              status="exception"
              format={(percent) => `总体分数:${percent}`}
              width={100}
            />
          </Space>
        </div>
      </div>

      <div className="next">
        <button
          className="next btn"
          onClick={nextBtnClick}
          disabled={run_status != 0}
        >
          <span>下一步</span>
        </button>
      </div>
    </BasicResWrap>
  );
};

export default memo(BasicResult);
