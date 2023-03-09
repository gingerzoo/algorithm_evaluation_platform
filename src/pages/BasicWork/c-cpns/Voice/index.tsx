import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import MyTable from "../table1";
import { useAppSelector } from "@/store";

interface Iprops {
  children?: ReactNode;
}

const WorkVoice: FC<Iprops> = (props) => {
  const { basicEffect } = useAppSelector((state) => ({
    basicEffect: state.basicEffect.voiceBe
  }));
  return (
    <MyTable
      secIndex={[
        {
          name: "字错误率",
          assess: "",
          weight: 9,
          score: basicEffect.word_error_rate_score,
          result: basicEffect.word_error_rate_result
        },
        {
          name: "句错误率",
          assess: "",
          weight: 9,
          score: basicEffect.sentence_error_rate_score,
          result: basicEffect.sentence_error_rate_result
        }
      ]}
      population_result={basicEffect.population_result}
      population_score={basicEffect.population_score}
    />
  );
};

export default memo(WorkVoice);
