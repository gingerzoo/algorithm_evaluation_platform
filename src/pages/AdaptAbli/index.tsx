import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AdaptWraper } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeGenDataStatAction,
  changePageSceneAction,
  getWorkDataAction,
  getWorkDefaultAction,
  getWorkResultAction,
  Iresult
} from "./store";
import { Button, message, Spin } from "antd";
import { sceneToNum } from "@/assets/data/local_data";

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
    genIsPending
  } = useAppSelector((state) => ({
    isGenPending: state.adaptAbili.genIsPending,
    isTestPending: state.adaptAbili.testIsPending,
    genData_status: state.adaptAbili.genData_status,
    needGenState: state.adaptAbili.needGenData,
    scene: state.basicConfig.scene,
    genIsPending: state.adaptAbili.genIsPending
  }));

  //拿到工况测试运行结果

  //   const realResult: string[] = [];
  const pageScene = location.hash.split("/").pop() as string;
  const sceneNum = sceneToNum[pageScene];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWorkDefaultAction());
    console.log("生成了一次默认数据");
  }, []);
  useEffect(() => {
    dispatch(changePageSceneAction(pageScene));
    // dispatch(changePa)
    // console.log("useEffect中的pagesecne", pageScene);
    console.log("genIs", genIsPending);
  }, [pageScene]);

  const genWorkData = () => {
    // if (!genData_status) dispatch(changeGenDataStatAction(-1));
    console.log("pagescene", pageScene);
    // if (genIsPending[sceneNum]) {
    //   message.open({
    //     type: "error",
    //     content: `有数据集正在生成，请稍后再试`,
    //     duration: 3
    //   });
    //   return;
    // }
    dispatch(getWorkDataAction(pageScene)).then((res) => {
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
    // if (genIsPending[sceneNum]) {
    //   message.open({
    //     type: "error",
    //     content: `有数据集正在生成，请稍后再试`,
    //     duration: 3
    //   });
    //   return;
    // }
    if (pageScene != scene) {
      message.open({
        type: "error",
        content: `生成的数据集与基础配置中的场景不一致`,
        duration: 3
      });
      return;
    }

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
  return (
    <AdaptWraper
      canTest={
        scene == pageScene ||
        !needGenState ||
        (needGenState && genData_status == 0)
      }
    >
      <Outlet />
      <div className="operate">
        <Button
          className="generate-data btn"
          type="primary"
          //   disabled={scene != pageScene || !needGenState}
          //   disabled={scene != pageScene}
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
          <Spin spinning={scene == pageScene && isTestPending} size={"large"} />
        </div>
      </div>
      、
    </AdaptWraper>
  );
};

export default memo(AdaptAbil);
