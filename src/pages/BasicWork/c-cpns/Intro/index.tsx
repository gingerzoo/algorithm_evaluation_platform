import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import MyTable from "../table1";
import { useAppSelector } from "@/store";

interface Iprops {
  children?: ReactNode;
}

const WorkIntro: FC<Iprops> = (props) => {
  const { basicEffect } = useAppSelector((state) => ({
    basicEffect: state.basicEffect.guideBe
  }));

  //   const basicEffect = scene ? basicEffects.navigateBe: "";
  return (
    <MyTable
      secIndex={[
        {
          name: "中心位置误差",
          assess: "错误率预计为5%以下",
          weight: 9,
          score: basicEffect.center_position_error_score,
          result: basicEffect.center_position_error_result
        },
        {
          name: "区域重叠度",
          assess: "阈值预计为50%以上",
          weight: 4,
          score: basicEffect.iou_score,
          result: basicEffect.iou_result
        },
        {
          name: "跟踪鲁棒性",
          assess: "稳定跟踪比例为80%以上",
          weight: 9,
          score: basicEffect.robustness_score,
          result: basicEffect.robustness_result
        }
      ]}
      population_score={basicEffect.population_score}
      population_result={basicEffect.population_result}
    />
  );
};

export default memo(WorkIntro);
