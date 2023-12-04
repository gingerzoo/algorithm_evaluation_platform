import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { MultiWrap } from "./style";
import Select_Data from "./c-cpns/select";
import { postMultiWaveAction } from "./service/index";

import RGB_img from "@/assets/images/RGB_0.png";
import RGB_infra from "@/assets/images/RGB_infrared.png";
import RGB_far from "@/assets/images/RGB_far.png";

import Basic_result from "../BasicConfig/c-cpns/basic_result";
import { useAppDispatch, useAppSelector } from "@/store";
import { IbasicRes } from "@/type";
import { message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { changeRgbPath, changeInfraredPath, changeSarPath } from "./store";
// import attack from "@/assets/images/attack.png";
interface Iprops {
  children?: ReactNode;
}

const MultiWave: FC<Iprops> = () => {
  const dispatch = useAppDispatch();

  const {
    scene,
    sceneNum,
    rgb,
    infrared,
    sar,
    value,
    reality,
    info_ret,
    multiwave_result,
    run_status,
    isPending
  } = useAppSelector((state) => ({
    scene: state.basicConfig.scene,
    sceneNum: state.basicConfig.sceneNum,

    rgb: state.multiwave.rgb,
    infrared: state.multiwave.infrared,
    sar: state.multiwave.sar,

    reality: state.multiwave.reality,
    value: state.multiwave.data,
    info_ret: state.multiwave.info_ret,

    multiwave_result: state.multiwave,
    run_status: state.multiwave.run_status,
    isPending: state.multiwave.isPending
  }));

  const curResult = multiwave_result[scene] as IbasicRes;

  const getvalueHandle = () => {
    console.log(typeof value);
  };
  const postrgbHandle = () => {
    const values = Object.values(value);
    if (values[0].includes("可见光")) {
      dispatch(changeRgbPath("rgb"));
    } else {
      dispatch(changeRgbPath("None"));
    }

    if (values[0].includes("红外")) {
      dispatch(changeInfraredPath("infrared"));
    } else {
      dispatch(changeInfraredPath("None"));
    }

    if (values[0].includes("雷达")) {
      dispatch(changeSarPath("sar"));
    } else {
      dispatch(changeSarPath("None"));
    }

    dispatch(postMultiWaveAction()).then((res) => {
      if (postMultiWaveAction.fulfilled.match(res)) {
        if (!res.payload.status) {
          message.success({
            content: "多波段协同测试成功",
            duration: 2
          });
        } else {
          // failed(res.payload.info);
          message.error({
            content: res.payload.info,
            duration: 2
          });
        }
      }
    });
  };
  useEffect(() => {
    console.log("rgbpath is", rgb); // 这里可以获取到最新的 rgb 值
  }, [rgb]); // 当 rgb 值发生变化时触发 useEffect
  useEffect(() => {
    console.log("infraredpath is", infrared); // 这里可以获取到最新的 rgb 值
  }, [infrared]); // 当 rgb 值发生变化时触发 useEffect
  useEffect(() => {
    console.log("sarpath is", sar); // 这里可以获取到最新的 rgb 值
  }, [sar]); // 当 rgb 值发生变化时触发 useEffect
  useEffect(() => {
    console.log("run_status is", run_status, scene, sceneNum);
  }, [run_status]);
  useEffect(() => {
    console.log("current_result is", curResult);
  }, [run_status]);

  return (
    <MultiWrap>
      <div className="top">
        <p className="describe">
          多波段协同任务旨在开展对多模态融合遥感算法的研究。主要涵盖可见光、红外和雷达三种波段，通过选择其中两个或者三个波段，对融合多模态的遥感算法进行测试，以反映其性能。
        </p>
        <p className="describe">
          多波段协同探测利用不同波段的传感器获取目标的多种特征信息，并将它们融合在一起进行综合分析。可见光图像、红外图像和雷达图像各自具有独特的特点和优势，通过它们之间的协同作用，可以弥补各自的不足，提高探测的效果。
        </p>
        <p className="describe">
          多波段协同探测的优点之一是提供了更全面、更准确的目标信息。不同波段的传感器可以捕捉到目标的不同特征，例如形状、纹理、热量等，通过融合这些信息，可以提高探测的精度和可靠性。此外，多波段协同探测还具有适应性和鲁棒性强的特点。在不同的环境条件下，不同波段的传感器可能表现出不同的优势，通过选择最合适的波段组合，可以适应各种复杂场景，并提供稳定的探测性能。
        </p>

        <div className="pic">
          <div className="picture">
            <img src={RGB_img} />
            <p>可见光</p>
          </div>
          <div className="picture">
            <img src={RGB_infra} />
            <p>红外</p>
          </div>
          <div className="picture">
            <img src={RGB_far} />
            <p>雷达</p>
          </div>
        </div>
      </div>

      <Select_Data />

      <div className="exec">
        <button className="btn" onClick={postrgbHandle}>
          <span>执行测试</span>
        </button>
        <Spin spinning={isPending} size="large" />
      </div>

      {run_status == 0 && (
        <Basic_result
          sceneNum={sceneNum}
          curResult={curResult}
          title="多波段协同"
          nextPath={`/profile/table`}
        />
      )}
    </MultiWrap>
  );
};

export default memo(MultiWave);
