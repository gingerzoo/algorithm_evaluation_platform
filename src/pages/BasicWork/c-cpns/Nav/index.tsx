import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import MyTable from "../table1";
import { useAppSelector } from "@/store";

interface Iprops {
  children?: ReactNode;
}

const WorkNav: FC<Iprops> = (props) => {
  const { basicEffect } = useAppSelector((state) => ({
    basicEffect: state.basicEffect.navigateBe
  }));
  return (
    <MyTable
      secIndex={[
        {
          name: "互信息",
          assess: "错误率预计为5%以下",
          weight: 9,
          score: basicEffect.mutual_information_score,
          result: basicEffect.mutual_information_result
        },
        {
          name: "相关性",
          assess: "阈值预计为50%以上",
          weight: 9,
          score: basicEffect.relevance_score,
          result: basicEffect.relevance_result
        },
        {
          name: "定位精度",
          assess: "稳定跟踪比例为80%以上",
          weight: 5,
          score: basicEffect.population_score,
          result: basicEffect.positioning_accuracy_result
        }
      ]}
      population_score={basicEffect.population_score}
      population_result={basicEffect.population_result}
    />
  );
};

export default memo(WorkNav);
