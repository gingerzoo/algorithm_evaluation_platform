import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { TableWrap } from "./style";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  basicResInfoList,
  basicResList,
  datasets,
  subs
} from "@/assets/data/local_data";
import My_drawer from "@/components/my_drawer";
import { getResultImgsAction } from "../../../BasicWork/store";
import { useNavigate } from "react-router-dom";
import { IbasicRes } from "@/type";
import useNextPathBtn from "@/hooks/useNextPath";

interface Isecindex {
  name: string;
  assess: string;
  score: number;
  result: number;
}

interface Iprops {
  children?: ReactNode;
}

const MyTable: FC<Iprops> = (props) => {
  //   const { secIndex, status[status.length - 1], population_score } = props;
  const { sceneNum, curModel, mutiWaveResult, info_ret, value, scene } =
    useAppSelector((state) => ({
      sceneNum: state.basicConfig.sceneNum,
      scene: state.basicConfig.scene,
      curModel: state.basicConfig.currentModule,
      mutiWaveResult: state.multiwave,
      value: state.multiwave.data,
      info_ret: state.multiwave.info_ret
    }));

  const { score, status } = mutiWaveResult[scene] as IbasicRes;

  const curResult = basicResList[sceneNum].map((item, index) => ({
    name: item,
    assess: basicResInfoList[sceneNum][index],
    score: score[index],
    result: status[index]
  }));

  const navigate = useNavigate();
  const toNextPath = useNextPathBtn();

  const nextBtnClick = () => {
    toNextPath("/profile/absawareness");
  };

  const secondIndex = (
    <table className="smalltable table_v1 table_color">
      <tbody>
        <tr>
          <td className="row-sub-header">一级指标</td>
          <td colSpan={5}>算法功能实现的准确性</td>
        </tr>
        <tr>
          <td rowSpan={curResult.length + 1}>二级指标</td>
          <td style={{ width: "10vw" }}>名称</td>
          <td>评估阈值</td>
          {/* <td style={{ width: "6vw" }}>权重</td> */}
          <td style={{ width: "7.2vw" }}>得分</td>
          <td
            className="show_basicResult"
            style={{ width: "10vw" }}
            /*             onClick={() => {
              setDrawOpen(true);
            }} */
          >
            结果
          </td>
        </tr>
        {curResult.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.assess}</td>
              {/* <td>{item.weight}</td> */}
              <td
                className={["score", item.result ? "noPass" : "pass"].join(" ")}
              >
                {item.score}
              </td>
              <td>
                {item.result ? (
                  <CloseCircleFilled
                    style={{ color: "#FF0000", fontSize: "16px" }}
                  />
                ) : (
                  <CheckCircleFilled
                    style={{ color: "#ABCC79", fontSize: "16px" }}
                  />
                )}
              </td>
            </tr>
          );
        })}
        <tr>
          <td className="row-sub-header">总体分数</td>
          <td colSpan={3} className="population">
            {score[score.length - 1]}
          </td>
          <td>
            {status[status.length - 1] ? (
              <CloseCircleFilled
                style={{ color: "#FF0000", fontSize: "16px" }}
              />
            ) : (
              <CheckCircleFilled
                style={{ color: "#ABCC79", fontSize: "16px" }}
              />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
  return (
    <TableWrap result={status[status.length - 1]}>
      <table className="largetable table_v1 table_color">
        <tbody>
          <tr>
            <td className="row-header">算法名称</td>
            <td>{curModel}算法</td>
          </tr>
          <tr>
            <td>输入说明</td>
            <td>
              数据集为{subs[sceneNum]?.title}的{value[0]}样本
            </td>
          </tr>
          <tr>
            <td>主要活动</td>
            <td className="no-pad nest">{secondIndex}</td>
          </tr>
          <tr>
            <td>总体评价</td>
            <td>{info_ret}</td>
          </tr>
        </tbody>
      </table>
      {/*       <My_drawer
        title="结果预览"
        drawerOpen={drawerOpen}
        sceneNum={sceneNum}
        imgUrls={resImgs}
        onClose={() => {
          setDrawOpen(false);
        }}
        onLeave={() => {
          setDrawOpen(false);
        }}
      /> */}
      <button className="next" onClick={nextBtnClick}>
        <span>抽象感知能力测试</span>
      </button>
    </TableWrap>
  );
};

export default memo(MyTable);
