import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AdaptWraper } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeAdaptRunStatusAction,
  changeConditionList,
  changeNewWorkObjAction,
  getWorkDataAction,
  getWorkResultAction
} from "./store";
import { Button, message, Spin } from "antd";
import {
  basicAllResList,
  basicResList,
  sceneToNum
} from "@/assets/data/local_data";
import WorkIntro from "./c-cpns/Intro";
import WorkNav from "./c-cpns/Nav";
import WorkRemote from "./c-cpns/Remote";
import WorkVoice from "./c-cpns/Voice";
import { changeNextPathAction } from "../BasicConfig/store";

import Radar_v2 from "@/components/radar_v2";
import useCalcWorkNum from "@/hooks/useCalcWorkNum";
import {
  changeNoiceIsCheckedFlagAction,
  changeNoiceWorkStatusAction,
  getVoiceWorkDataAction,
  getVoiceWorkResAction
} from "@/pages/NoiseModel/store";
import { CaretRightOutlined } from "@ant-design/icons";
import classNames from "classnames";

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
    compareRes,
    basicStatus,
    isVoiceCheckedFlag,
    isVoiceGenPending,
    isVoiceTestPending,
    noice_run_status
  } = useAppSelector((state) => ({
    isGenPending: state.adaptAbili.genIsPending,
    isTestPending: state.adaptAbili.testIsPending,
    genData_status: state.adaptAbili.genData_status,
    needGenState: state.adaptAbili.needGenData,
    scene: state.basicConfig.scene,
    genIsPending: state.adaptAbili.genIsPending,
    run_status: state.adaptAbili.run_status,
    compareRes: state.adaptAbili.compareRes,
    basicStatus: state.basicEffect.run_status,
    isVoiceCheckedFlag: state.noiseModel.isCheckedFlag,
    isVoiceGenPending: state.noiseModel.noiceGenIsPending,
    isVoiceTestPending: state.noiseModel.noiceTestIsPending,
    noice_run_status: state.noiseModel.work_status,
    noice_genData_status: state.noiseModel.gen_status
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

  const genWorkData = async () => {
    let res = null;

    if (isVoiceCheckedFlag) {
      dispatch(changeNoiceWorkStatusAction(-1));
      res = await dispatch(getVoiceWorkDataAction());
    } else {
      dispatch(changeAdaptRunStatusAction(-1));
      res = await dispatch(getWorkDataAction());
    }
    // const res = await dispatch(getWorkDataAction());
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
  };
  const runWorkTest = async () => {
    console.log("点击了执行工况！！！！！！");
    let res = null;
    if (isVoiceCheckedFlag) {
      res = await dispatch(getVoiceWorkResAction());
    } else {
      res = await dispatch(getWorkResultAction());
    }

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
  };

  const { data, indicator, workName } = useCalcWorkNum();

  //   console.log("workName", workName);

  /* 传给雷达图的数据 */
  //   const data = compareRes?.map((item, index) => ({
  //     value: item,
  //     name: workName[index]
  //   }));

  //   const resList = basicStatus ? basicResList : basicAllResList;

  //   const indicator = resList[sceneNum].map((item) => ({
  //     name: item,
  //     max: 100
  //   }));

  /* 页面切换按钮 */
  const checkHandle = () => {
    // if (isVoiceCheckedFlag) {
    //   dispatch(changeNoiceWorkStatusAction(-1));
    // } else {
    //   dispatch(changeAdaptRunStatusAction(-1));
    // }

    dispatch(changeNoiceIsCheckedFlagAction(!isVoiceCheckedFlag));
  };

  return (
    <AdaptWraper
      canTest={!needGenState || (needGenState && genData_status == 0)}
      run_status={run_status}
    >
      <div className="checkbox">
        <Button
          onClick={checkHandle}
          className={classNames("btn", "transfor")}
          icon={<CaretRightOutlined />}
          disabled={scene === "voice"}
        >
          {!isVoiceCheckedFlag ? "物理噪声模型" : "自定义模型"}
        </Button>
      </div>
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
          <Spin
            spinning={
              isVoiceCheckedFlag ? isVoiceGenPending : isGenPending[sceneNum]
            }
            size={"large"}
          />
        </div>
        {/* disabled={scene != pageScene || (needGenState && genData_status != 0)} */}
        <Button
          className="run_test btn"
          type="primary"
          onClick={() => {
            runWorkTest();
          }}
          //   disabled={needGenState && genData_status != 0}
          //   disabled={
          //     isVoiceCheckedFlag ? noice_run_status !== 0 : genData_status !== 0
          //   }
        >
          进行工况测试
        </Button>
        <div className="spinning">
          <Spin
            spinning={
              isVoiceCheckedFlag ? isVoiceTestPending : isTestPending[sceneNum]
            }
            size={"large"}
          />
        </div>
        <Button
          className="next btn"
          disabled={
            isVoiceCheckedFlag ? noice_run_status !== 0 : run_status !== 0
          }
          onClick={() => {
            const next_path = "/profile/trust";
            dispatch(changeNextPathAction(next_path));
            navigate(next_path);
          }}
        >
          评估可信赖能力
        </Button>
      </div>
      {((isVoiceCheckedFlag && noice_run_status === 0) ||
        (!isVoiceCheckedFlag && run_status === 0)) && (
        <Radar_v2 data={data} indicator={indicator} isAll_res={false} />
      )}
    </AdaptWraper>
  );
};

export default memo(AdaptAbil);
