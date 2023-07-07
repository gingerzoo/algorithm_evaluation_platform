import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import MyTable from "../table1";
import { useAppSelector } from "@/store";

interface Iprops {
  children?: ReactNode;
}

const WorkRemote: FC<Iprops> = (props) => {
  const { basicEffect } = useAppSelector((state) => ({
    basicEffect: state.basicEffect.remoteBe
  }));
  return (
    <MyTable
      secIndex={[
        {
          name: "F1-score",
          assess: "IOU阈值设置为0.75时,分数不低于0.8",
          weight: 9,
          score: basicEffect.f1_score,
          result: basicEffect.f1_result
        },
        {
          name: "mAP",
          assess: "IOU设置为0.5到0.95时,分数不低于0.6",
          weight: 9,
          score: basicEffect.map_score,
          result: basicEffect.map_result
        },
        {
          name: "mar",
          assess: "平均查全率分数不低于0.8",
          weight: 9,
          score: basicEffect.mar_score,
          result: basicEffect.mar_result
        }
      ]}
      population_result={basicEffect.population_result}
      population_score={basicEffect.population_score}
    />
  );
};

export default memo(WorkRemote);
