import React, { memo, Suspense, useCallback, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { useRoutes } from "react-router-dom";

import "@/assets/css/index.less";

import routes from "./router";

import { useAppDispatch, useAppSelector } from "./store";

import { shallowEqual } from "react-redux";

import AppHeader from "./components/app_header";
import { AppWrap } from "./AppStyle";

import AppSide from "@/components/app_side";
import Green_hand from "./components/green_hand";
import App_cover from "./components/app_cover";
import Header_process from "./components/header_process";
import { getAlogListAction } from "./pages/BasicConfig/store";

interface Iprops {
  children?: ReactNode;
}

const App: FC<Iprops> = () => {
  const { scene } = useAppSelector(
    (state) => ({
      scene: state.basicConfig.scene
    }),
    shallowEqual
  );

  const [isGreen, setIsGreen] = useState(false);

  const dispatch = useAppDispatch();

  const greenBtnHandle = useCallback(() => {
    setIsGreen(!isGreen);
    console.log("我被点了");
  }, [isGreen]);

  useEffect(() => {
    //请求模型列表
    dispatch(getAlogListAction());
  }, []);

  return (
    <AppWrap isGreen={isGreen}>
      {/* <App_header />
      <div className="main">
        <App_side />
        <Suspense>
          <div className="main">{useRoutes(routes)}</div>
        </Suspense>
      </div> */}
      <AppHeader greenClickHandle={greenBtnHandle} />
      <Header_process />
      <div className="main">
        <AppSide />

        <Suspense>
          <div className="content">
            {useRoutes(routes)}
            <div className="cover green-hand">
              <App_cover btnClickHandle={greenBtnHandle} width={800}>
                <Green_hand />
              </App_cover>
            </div>
          </div>
        </Suspense>
      </div>
    </AppWrap>
  );
};

export default memo(App);
