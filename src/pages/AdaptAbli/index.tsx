import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AdaptWraper } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import { getWorkDefaultAction } from "./store";
import { Spin } from "antd";

interface Iprops {
  children?: ReactNode;
}

const AdaptAbil: FC<Iprops> = () => {
  const { isGenPending, isTestPending } = useAppSelector((state) => ({
    isGenPending: state.adaptAbili.genIsPending,
    isTestPending: state.adaptAbili.testIsPending
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWorkDefaultAction());
  }, []);
  return (
    <AdaptWraper>
      <Outlet />
      <div className="operate">
        <button className="generate-data btn">生成工况数据</button>
        <div className="spinning">
          <Spin spinning={isGenPending} size={"large"} />
        </div>
        <button className="next btn">进行工况测试</button>
        <div className="spinning">
          <Spin spinning={isTestPending} size={"large"} />
        </div>
      </div>
      、
    </AdaptWraper>
  );
};

export default memo(AdaptAbil);
