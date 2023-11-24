import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AdaptWraper } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeConditionList,
  changeNewWorkObjAction,
  getWorkDataAction,
  getWorkResultAction
} from "./store";
import { Button, message, Spin } from "antd";
import { basicAllResList, sceneToNum } from "@/assets/data/local_data";
import WorkIntro from "./c-cpns/Intro";
import WorkNav from "./c-cpns/Nav";
import WorkRemote from "./c-cpns/Remote";
import WorkVoice from "./c-cpns/Voice";
import { changeNextPathAction } from "../BasicConfig/store";

import Radar_v2 from "@/components/radar_v2";
import useCalcWorkNum from "@/hooks/useCalcWorkNum";

interface Iprops {
  children?: ReactNode;
}

const AdaptAbil: FC<Iprops> = () => {
  const {
    isGenPending,
    isTestPending,
    genData_status,
    needGenState,
    scene,
    run_status,
    compareRes
  } = useAppSelector((state) => ({
    isGenPending: state.adaptAbili.genIsPending,
    isTestPending: state.adaptAbili.testIsPending,
    genData_status: state.adaptAbili.genData_status,
    needGenState: state.adaptAbili.needGenData,
    scene: state.basicConfig.scene,
    genIsPending: state.adaptAbili.genIsPending,
    run_status: state.adaptAbili.runResult.status,
    compareRes: state.adaptAbili.compareRes
  }));

  //拿到工况测试运行结果

  //   const realResult: string[] = [];
  //   const pageScene = location.hash.split("/").pop() as string;
  const sceneNum = sceneToNum[scene];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     dispatch(getWorkDefaultAction());
  //     console.log("生成了一次默认数据");
  //   }, [scene]);
  useEffect(() => {
    // console.log("genIs", genIsPending);
    dispatch(changeNewWorkObjAction({}));
    dispatch(changeConditionList([]));
  }, [scene]);

  const genWorkData = () => {
    // if (!genData_status) dispatch(changeGenDataStatAction(-1));
    console.log("pagescene", scene);
    dispatch(getWorkDataAction(scene)).then((res) => {
      if (getWorkDataAction.fulfilled.match(res)) {
        if (res.payload.status == 0) {
          message.open({
            type: "success",
            content: "生成工况数据成功",
            duration: 2
          });
          console.log(`生成工况数据成功`);
        } else {
          message.open({
            type: "error",
            content: `${res.payload.info}`,
            duration: 2
          });
          console.log("生成工况数据失败");
        }
      }
    });
  };
  const runWorkTest = () => {
    dispatch(getWorkResultAction()).then((res) => {
      if (getWorkResultAction.fulfilled.match(res)) {
        if (res.payload.status == 0) {
          message.open({
            type: "success",
            content: "执行工况测试成功",
            duration: 2
          });
        } else {
          message.open({
            type: "error",
            content: `${res.payload.info}`,
            duration: 2
          });
        }
      }
    });
  };

  const workName = useCalcWorkNum();
  workName.push("基础效能");
  //   console.log("workName", workName);

  /* 传给雷达图的数据 */
  const data = compareRes?.map((item, index) => ({
    value: item,
    name: workName[index]
  }));

  const indicator = basicAllResList[sceneNum].map((item) => ({
    name: item,
    // value: result[item.en],
    max: 100
  }));

  return (
    <AdaptWraper
      canTest={!needGenState || (needGenState && genData_status == 0)}
      run_status={run_status}
    >
      {sceneNum == 0 && <WorkIntro />}
      {sceneNum == 1 && <WorkNav />}
      {sceneNum == 2 && <WorkRemote />}
      {sceneNum == 3 && <WorkVoice />}
      <div className="operate">
        <Button
          className="generate-data btn"
          type="primary"
          onClick={() => {
            genWorkData();
          }}
        >
          生成工况数据
        </Button>
        <div className="spinning">
          <Spin spinning={isGenPending[sceneNum]} size={"large"} />
        </div>
        {/* disabled={scene != pageScene || (needGenState && genData_status != 0)} */}
        <Button
          className="run_test btn"
          type="primary"
          onClick={() => {
            runWorkTest();
          }}
          disabled={needGenState && genData_status != 0}
        >
          进行工况测试
        </Button>
        <div className="spinning">
          <Spin spinning={isTestPending[sceneNum]} size={"large"} />
        </div>
        <Button
          className="next btn"
          disabled={run_status !== 0}
          onClick={() => {
            const next_path = "/profile/trust";
            dispatch(changeNextPathAction(next_path));
            navigate(next_path);
          }}
        >
          评估可信赖能力
        </Button>
      </div>
      {!run_status && <Radar_v2 data={data} indicator={indicator} />}
      {/* <Radar_v2 data={data} indicator={indicator} /> */}
    </AdaptWraper>
  );
};

export default memo(AdaptAbil);
