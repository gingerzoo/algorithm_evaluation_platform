import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import MyTable2 from "../table2";
import { useAppSelector } from "@/store";
import { shallowEqual } from "react-redux";
import NoiceModule from "@/pages/NoiseModel/index";

interface Iprops {
  children?: ReactNode;
}

const AdapRemote: FC<Iprops> = (props) => {
  const { workConditions, isCheckedFlag } = useAppSelector(
    (state) => ({
      workConditions: state.adaptAbili.remote,
      isCheckedFlag: state.noiseModel.isCheckedFlag
    }),
    shallowEqual
  );
  return (
    <div>
      {isCheckedFlag ? (
        <NoiceModule />
      ) : (
        <MyTable2 workConditions={workConditions} />
      )}
    </div>
  );
};

export default memo(AdapRemote);
