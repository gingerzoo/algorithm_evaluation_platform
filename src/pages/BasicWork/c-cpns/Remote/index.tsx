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
          assess: "错误率预计为5%以下",
          weight: 9,
          score: basicEffect.f1_score,
          result: basicEffect.f1_result
        },
        {
          name: "mAP",
          assess: "",
          weight: 9,
          score: basicEffect.map_score,
          result: basicEffect.map_result
        },
        {
          name: "AUC",
          assess: "阈值预计为50%以上",
          weight: 9,
          score: basicEffect.auc_score,
          result: basicEffect.auc_result
        }
      ]}
      population_result={basicEffect.population_result}
      population_score={basicEffect.population_score}
    />
  );
};

export default memo(WorkRemote);
