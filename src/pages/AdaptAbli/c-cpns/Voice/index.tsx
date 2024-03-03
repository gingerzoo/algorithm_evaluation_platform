import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import MyTable2 from "../table2";
import { useAppDispatch, useAppSelector } from "@/store";
import { shallowEqual } from "react-redux";
import { changeNoiceWorkStatusAction } from "@/pages/NoiseModel/store";

interface Iprops {
  children?: ReactNode;
}

const AdaptVoice: FC<Iprops> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("语音的useEffect更新了");
    dispatch(changeNoiceWorkStatusAction(-1));
  });
  const { workConditions, isCheckedFlag } = useAppSelector(
    (state) => ({
      workConditions: state.adaptAbili.voice,
      isCheckedFlag: state.noiseModel.isCheckedFlag
    }),
    shallowEqual
  );

  return (
    <div>
      <MyTable2 workConditions={workConditions} />
    </div>
  );
};

export default memo(AdaptVoice);
