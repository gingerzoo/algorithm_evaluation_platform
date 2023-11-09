import React, { memo, Suspense, useState } from "react";
import type { FC, ReactNode } from "react";
import { useRoutes } from "react-router-dom";
import "@/assets/css/index.less";
import routes from "./router";
import Login from "./components/login";

interface Iprops {
  children?: ReactNode;
}

const App: FC<Iprops> = () => {
  return (
    <div>
      <Suspense>{useRoutes(routes)}</Suspense>
      <Login />
    </div>
  );
};

export default memo(App);
