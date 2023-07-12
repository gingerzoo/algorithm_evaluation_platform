import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { BasicResWrap } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeNextPathAction, changeNowProcessAction } from "../../store";
import { useNavigate } from "react-router-dom";
import { basicResList } from "@/assets/data/local_data";
import { Progress, Space } from "antd";
import { IbasicRes } from "@/type";

interface Iprops {
  children?: ReactNode;

  curResult: IbasicRes;
  sceneNum: number;
  title: string;
  nextPath: string;
}

const BasicResult: FC<Iprops> = ({ curResult, sceneNum, title, nextPath }) => {
  //   const curResult = basic_result[scene] as IbasicRes;
  const curScore = curResult.score;
  const resLen = curScore.length;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const color = ["#73C0DE", "#7496d2", "#ecd472"];

  //下一步按钮点击处理函数
  function nextBtnClick() {
    // const nextPath = `/profile/basicwork`;
    dispatch(changeNextPathAction(nextPath));
    dispatch(changeNowProcessAction(["基础设置", "基础效能"]));

    navigate(nextPath);
  }
  return (
    <BasicResWrap>
      <div className="result">
        <h4 className="header">{title}测试结果</h4>
        <div className="content">
          <div className="left">
            {basicResList[sceneNum].map((item, index) => (
              <div key={index} className="result_item">
                <div className="name">{item}</div>
                <Progress
                  percent={curScore[index]}
                  status={
                    curResult["status"][index] == 0 ? "success" : "exception"
                  }
                  showInfo={true}
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
              percent={curScore[resLen - 1]}
              //   status="exception"
              status={
                curResult["status"][resLen - 1] == 0 ? "success" : "exception"
              }
              format={(percent) => `总体分数:${percent}`}
              width={100}
            />
          </Space>
        </div>
      </div>

      <div className="next">
        <button className="btn" onClick={nextBtnClick}>
          <span>下一步</span>
        </button>
      </div>
    </BasicResWrap>
  );
};

export default memo(BasicResult);
