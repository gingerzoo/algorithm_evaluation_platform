import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { WorkWrap } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeNextPathAction,
  changeNowProcessAction
} from "../BasicConfig/store";
import { Button } from "antd";

import Table1 from "./c-cpns/table1";
import { basicResInfoList, basicResList } from "@/assets/data/local_data";
import { IbasicRes } from "@/type";
import useNextPathBtn from "@/hooks/useNextPath";

interface Iprops {
  children?: ReactNode;
}

const BasicWork: FC<Iprops> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { scene, sceneNum, nowProcess, basicResult } = useAppSelector(
    (state) => ({
      scene: state.basicConfig.scene,
      sceneNum: state.basicConfig.sceneNum,
      nowProcess: state.basicConfig.nowProcess,
      basicResult: state.basicEffect
    })
  );

  const { score, status } = basicResult[scene] as IbasicRes;
  const toNextPath = useNextPathBtn();

  function next() {
    toNextPath(`/profile/adapt`);
    dispatch(
      changeNowProcessAction(["基础设置", "基础效能", "可适应能力评估"])
    );
  }

  const curResult = basicResList[sceneNum].map((item, index) => ({
    name: item,
    assess: basicResInfoList[sceneNum][index],
    score: score[index],
    result: status[index]
  }));

  return (
    <WorkWrap>
      {/* {sceneNum == 0 && <WorkIntro />}
      {sceneNum == 1 && <WorkNav />}
      {sceneNum == 2 && <WorkRemote />}
      {sceneNum == 3 && <WorkVoice />} */}
      <Table1
        secIndex={curResult}
        population_result={status[status.length - 1]}
        population_score={score[score.length - 1]}
      />
      <div className="next">
        <Button onClick={next} type="primary" className="btn">
          进行可适应性评估
        </Button>
      </div>
    </WorkWrap>
  );
};

export default memo(BasicWork);
