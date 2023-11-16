import React, { memo, Suspense, useState } from "react";
import type { FC, ReactNode } from "react";
import { useRoutes } from "react-router-dom";
import "@/assets/css/index.less";
import routes from "./router";
import Login from "./components/login";
import { ConfigProvider } from "antd";

interface Iprops {
  children?: ReactNode;
}

const App: FC<Iprops> = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: "rgba(27,145,162,0.8)",

          // 派生变量，影响范围小
          colorBgContainer: "rgba(27,145,162,0.1)"
        }
      }}
    >
      <div>
        <Suspense>{useRoutes(routes)}</Suspense>
        <Login />
      </div>
    </ConfigProvider>
  );
};

export default memo(App);
