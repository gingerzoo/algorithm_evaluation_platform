import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { WorkWrap } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";

import Table1 from "../table1";
import { basicResInfoList, basicResList } from "@/assets/data/local_data";
import { IbasicRes } from "@/type";

interface Iprops {
  children?: ReactNode;
}

const Table: FC<Iprops> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { scene, sceneNum, nowProcess, basicResult, info_ret } = useAppSelector(
    (state) => ({
      scene: state.basicConfig.scene,
      sceneNum: state.basicConfig.sceneNum,
      nowProcess: state.basicConfig.nowProcess,
      basicResult: state.multiwave,
      info_ret: state.multiwave.info_ret
    })
  );

  const { score, status } = basicResult[scene] as IbasicRes;

  const curResult = basicResList[sceneNum].map((item, index) => ({
    name: item,
    assess: basicResInfoList[sceneNum][index],
    score: score[index],
    result: status[index]
  }));

  return (
    <WorkWrap>
      <Table1
        secIndex={curResult}
        population_result={status[status.length - 1]}
        population_score={score[score.length - 1]}
      />
    </WorkWrap>
  );
};

export default memo(Table);
