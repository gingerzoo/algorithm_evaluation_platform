import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { WorkWrap } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeNextPathAction,
  changeNowProcessAction
} from "../BasicConfig/store";

interface Iprops {
  children?: ReactNode;
}

const BasicWork: FC<Iprops> = () => {
  const navigate = useNavigate();
  const { scene, nowProcess } = useAppSelector((state) => ({
    scene: state.basicConfig.scene,
    nowProcess: state.basicConfig.nowProcess
  }));

  function next() {
    const nextPath = `/adapt/${scene}`;
    dispatch(changeNextPathAction(nextPath));
    navigate(nextPath);
    dispatch(
      changeNowProcessAction(["基础设置", "基础效能", "可适应能力评估"])
    );
  }

  const dispatch = useAppDispatch();
  return (
    <WorkWrap>
      <Outlet />
      <span className="next" onClick={next}>
        进行可适应性评估
      </span>
    </WorkWrap>
  );
};

export default memo(BasicWork);
