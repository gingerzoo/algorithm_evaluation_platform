import React, { memo, Suspense } from "react";
import type { FC, ReactNode } from "react";
import { useRoutes } from "react-router-dom";

import "@/assets/css/index.less";

import routes from "./router";

interface Iprops {
  children?: ReactNode;
}

const App: FC<Iprops> = () => {
  return (
    <div>
      <Suspense>{useRoutes(routes)}</Suspense>
    </div>
  );
};

export default memo(App);
