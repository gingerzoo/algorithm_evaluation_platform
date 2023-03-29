import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AdaptWraper } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getWorkDataAction,
  getWorkDefaultAction,
  getWorkResultAction,
  Iresult
} from "./store";
import { Button, message, Spin } from "antd";

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
    checkList
  } = useAppSelector((state) => ({
    isGenPending: state.adaptAbili.genIsPending,
    isTestPending: state.adaptAbili.testIsPending,
    genData_status: state.adaptAbili.genData_status,
    needGenState: state.adaptAbili.needGenData,
    scene: state.basicConfig.scene,
    checkList: state.adaptAbili.checkList
  }));

  //拿到工况测试运行结果

  //   const realResult: string[] = [];
  const pageScene = location.hash.split("/").pop();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWorkDefaultAction());
  }, []);

  const genWorkData = () => {
    dispatch(getWorkDataAction()).then((res) => {
      if (getWorkDataAction.fulfilled.match(res)) {
        if (res.payload.status == 0) {
          message.open({
            type: "success",
            content: "生成工况数据成功",
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
          disabled={scene != pageScene || !needGenState}
          onClick={() => {
            genWorkData();
          }}
        >
          生成工况数据
        </Button>
        <div className="spinning">
          <Spin spinning={scene == pageScene && isGenPending} size={"large"} />
        </div>
        {/* disabled={scene != pageScene || (needGenState && genData_status != 0)} */}
        <Button
          className="run_test btn"
          type="primary"
          onClick={() => {
            runWorkTest();
          }}
          disabled={scene != pageScene || (needGenState && genData_status != 0)}
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
