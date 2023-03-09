import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AdaptWraper } from "./style";

interface Iprops {
  children?: ReactNode;
}

const AdaptAbil: FC<Iprops> = () => {
  return (
    <AdaptWraper>
      <Outlet />
      <span className="next">进行工况测试</span>
    </AdaptWraper>
  );
};

export default memo(AdaptAbil);
