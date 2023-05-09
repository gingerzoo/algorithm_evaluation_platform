import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { WorkWrap } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeNextPathAction,
  changeNowProcessAction
} from "../BasicConfig/store";
import { Button } from "antd";

interface Iprops {
  children?: ReactNode;
}

const BasicWork: FC<Iprops> = () => {
  const navigate = useNavigate();
  const { scene, nowProcess } = useAppSelector((state) => ({
    scene: state.basicConfig.scene,
    nowProcess: state.basicConfig.nowProcess
  }));
  const pageScene = location.hash.split("/").pop();

  function next() {
    const nextPath = `/profile/adapt/${scene}`;
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
      <div className="next">
        <Button
          onClick={next}
          type="primary"
          disabled={pageScene != scene}
          className="btn"
        >
          进行可适应性评估
        </Button>
      </div>
    </WorkWrap>
  );
};

export default memo(BasicWork);
