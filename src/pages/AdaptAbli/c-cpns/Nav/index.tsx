import React, { memo } from "react";
import type { FC, ReactNode } from "react";

import MyTable2 from "../table2";
import { useAppSelector } from "@/store";
import { shallowEqual } from "react-redux";

interface Iprops {
  children?: ReactNode;
}

const AdapNav: FC<Iprops> = (props) => {
  const { workConditions } = useAppSelector(
    (state) => ({
      workConditions: state.adaptAbili.navigate
    }),
    shallowEqual
  );
  return (
    <div>
      <MyTable2 workConditions={workConditions} />
    </div>
  );
};

export default memo(AdapNav);
