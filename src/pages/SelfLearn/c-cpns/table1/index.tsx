import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { TableWrap } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import { datasets, subs } from "@/assets/data/local_data";
import My_drawer from "@/components/my_drawer";

interface Isecindex {
  name: string;
  assess: string;
  score: number;
  result: number;
  second_score: number;
}

interface Iprops {
  children?: ReactNode;
  secIndex: Isecindex[];
  population_score: number;
  population_result: number;
  population_score_second: number;
}

const MyTable: FC<Iprops> = (props) => {
  const {
    secIndex,
    population_result,
    population_score,
    population_score_second
  } = props;
  console.log(population_score);
  console.log(population_score_second);
  const { module_names, sceneNum, dataset, scene, curModel, slresImgs } =
    useAppSelector((state) => ({
      module_names: state.basicConfig.modelNames,
      sceneNum: state.basicConfig.sceneNum,
      dataset: state.basicConfig.dataSet,
      scene: state.basicConfig.scene,
      curModel: state.basicConfig.currentModule,
      slresImgs: state.selfLearn.slresImgs
    }));
  const pageScene = location.hash.split("/").pop();
  const nowModelName = module_names[`${pageScene}Name`];

  const dispatch = useAppDispatch();
  //控制抽屉组件开关的状态
  const [drawerOpen, setDrawOpen] = useState(false);

  // useEffect(() => {
  //   dispatch(getResultImgsAction());
  // }, []);

  const secondIndex = (
    <table className="smalltable table_v1 table_color">
      <tbody>
        <tr>
          <td className="row-sub-header">一级指标</td>
          <td colSpan={5}>算法功能实现的准确性</td>
        </tr>
        <tr>
          <td rowSpan={props.secIndex.length + 1}>二级指标</td>
          <td style={{ width: "10vw" }}>名称</td>
          <td>评估阈值</td>
          {/* <td style={{ width: "6vw" }}>权重</td> */}
          <td style={{ width: "7.2vw" }}>第一次得分</td>
          <td style={{ width: "7.2vw" }}>第二次得分</td>
          <td
            className="show_basicResult"
            style={{ width: "10vw" }}
            onClick={() => {
              setDrawOpen(true);
            }}
          >
            查看结果
          </td>
        </tr>
        {secIndex.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.assess}</td>
              {/* <td>{item.weight}</td> */}
              <td>{item.score}</td>
              <td>{item.second_score}</td>
              <td>
                {(
                  ((item.second_score - item.score) / item.score) *
                  100
                ).toFixed(2) + "%"}
              </td>
            </tr>
          );
        })}
        <tr>
          <td className="row-sub-header">总体评价</td>
          <td colSpan={5} className="population">
            {` 基础效能检测分数为为${population_score_second},智能等级为${Math.floor(
              population_score_second / 20 + 1
            )}`}
          </td>
          <td>
            {/* {population_result ? (
              <CloseCircleFilled
                style={{ color: "#FF0000", fontSize: "16px" }}
              />
            ) : (
              <CheckCircleFilled
                style={{ color: "#ABCC79", fontSize: "16px" }}
              />
            )} */}
          </td>
        </tr>
      </tbody>
    </table>
  );
  return (
    <TableWrap result={population_result}>
      <table className="largetable table_v1 table_color">
        <tbody>
          <tr>
            <td className="row-header">算法名称</td>
            <td>{curModel}算法</td>
          </tr>
          <tr>
            <td>输入说明</td>
            <td>
              数据集为{subs[sceneNum]?.title}的{datasets[dataset]}样本
            </td>
          </tr>
          <tr>
            <td>主要活动</td>
            <td className="no-pad nest">{secondIndex}</td>
          </tr>
        </tbody>
      </table>
      <My_drawer
        title="结果预览"
        drawerOpen={drawerOpen}
        sceneNum={sceneNum}
        imgUrls={slresImgs}
        onClose={() => {
          setDrawOpen(false);
        }}
        onLeave={() => {
          setDrawOpen(false);
        }}
      />
    </TableWrap>
  );
};

export default memo(MyTable);
