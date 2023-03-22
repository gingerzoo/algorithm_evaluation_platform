import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { TableWrap } from "./style";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useAppSelector } from "@/store";
import { datasets, subs } from "@/assets/data/local_data";
interface Isecindex {
  name: string;
  assess: string;
  weight: number;
  score: number;
  result: number;
}

interface Iprops {
  children?: ReactNode;
  secIndex: Isecindex[];
  population_score: number;
  population_result: number;
}

const MyTable: FC<Iprops> = (props) => {
  const { secIndex, population_result, population_score } = props;
  const { module_names, sceneNum, dataset, scene } = useAppSelector(
    (state) => ({
      module_names: state.basicConfig.modelNames,
      sceneNum: state.basicConfig.sceneNum,
      dataset: state.basicConfig.dataSet,
      scene: state.basicConfig.scene
    })
  );

  const pageScene = location.hash.split("/").pop();
  const nowModelName = module_names[`${pageScene}Name`];
  const secondIndex = (
    <table className="smalltable table_v1 table_color">
      <tbody>
        <tr>
          <td className="row-sub-header">一级指标</td>
          <td colSpan={5}>算法功能实现的准确性</td>
        </tr>
        <tr>
          <td rowSpan={props.secIndex.length + 1} className="row-sub-header">
            二级指标
          </td>
          <td style={{ width: "11.8vw" }}>名称</td>
          <td>评估工作</td>
          <td style={{ width: "5.6vw" }}>权重</td>
          <td style={{ width: "7vw" }}>得分</td>
          <td style={{ width: "5.6vw" }}>结果</td>
        </tr>
        {secIndex.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.assess}</td>
              <td>{item.weight}</td>
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
          <td colSpan={4} className="population">
            {population_score}
          </td>
          <td>
            {population_result ? (
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
    <TableWrap result={population_result}>
      <table className="largetable table_v1 table_color">
        <tbody>
          <tr>
            <td className="row-header">算法名称</td>
            <td>{nowModelName}算法</td>
          </tr>
          <tr>
            <td className="row-header">算法说明</td>
            <td>
              {nowModelName}算法采用xxx方案,实现{pageScene}效果
            </td>
          </tr>
          <tr>
            <td className="row-header">输入说明</td>
            <td>
              数据集为{subs[sceneNum]?.title}的{datasets[dataset]}样本
            </td>
          </tr>
          <tr>
            <td className="row-header">主要活动</td>
            <td className="no-pad nest">{secondIndex}</td>
          </tr>
        </tbody>
      </table>
    </TableWrap>
  );
};

export default memo(MyTable);
