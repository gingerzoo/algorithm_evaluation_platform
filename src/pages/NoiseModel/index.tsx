import React, { Fragment, memo } from "react";
import type { FC, ReactNode } from "react";
import { NoiseModelWrapper } from "./style";
import {
  noiceDefaultType,
  NoiseArray,
  noiseDataLimit,
  NoiseDescribe
} from "@/assets/data/local_data";
import {
  changeNoiceAllWorkCondition,
  changeNoiceCheckListAction
} from "./store";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/store";
import Basic_result from "../BasicConfig/c-cpns/basic_result";
import { IbasicRes, Iwork } from "@/type";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import { Radio } from "antd";
import internal from "stream";
import { deepClone } from "@/utils/deepClone";
// import { Button } from "antd";

interface Iprops {
  children?: ReactNode;
}

const NoiseModel2: FC<Iprops> = () => {
  const {
    // current,
    // bandwidth,
    // exposureTime,
    // photonCount,
    // temperature,
    // resistance,
    // thermalBandwidth,
    // minQuantizationUnit,
    // gainK1,
    // gainK2,
    run_res,
    sceneNum,
    work_allCndition,
    checkList
  } = useAppSelector((state) => ({
    // current: state.noiseModel.current,
    // bandwidth: state.noiseModel.bandwidth,
    // exposureTime: state.noiseModel.exposureTime,
    // photonCount: state.noiseModel.photonCount,
    // temperature: state.noiseModel.temperature,
    // resistance: state.noiseModel.resistance,
    // thermalBandwidth: state.noiseModel.tbandwidth,
    // minQuantizationUnit: state.noiseModel.mqUnit,
    // gainK1: state.noiseModel.gainK1,
    // gainK2: state.noiseModel.gainK2,
    run_res: state.noiseModel.work_result,
    sceneNum: state.basicConfig.sceneNum,
    work_allCndition: state.noiseModel.work_Allcondition,
    checkList: state.noiseModel.isSelect
  }));
  const dispatch = useDispatch();

  //   const noiseArray = [
  //     current,
  //     bandwidth,
  //     exposureTime,
  //     photonCount,
  //     temperature,
  //     resistance,
  //     thermalBandwidth,
  //     minQuantizationUnit,
  //     gainK1,
  //     gainK2
  //   ];

  //   const clickHandle = () => {
  //     console.log(noiseArray);
  //   };

  const checkChangeHandle = (e: CheckboxChangeEvent, workIndex: number) => {
    // console.log(`checked = ${e.target.checked}`);
    const newCheckList = new Array(checkList.length).fill(false);
    newCheckList[workIndex] = e.target.checked;

    dispatch(changeNoiceCheckListAction(newCheckList));
  };

  const changeNoiceIntensity = (
    e: React.ChangeEvent<HTMLInputElement>,
    workIndex: number,
    condition: string
  ) => {
    console.log("改变后的噪声工况强度", e.target.value);

    const newConditions: Iwork[] = [];
    work_allCndition.forEach((item, index) => {
      const newCondition = deepClone(item);
      newConditions.push(newCondition);
    });
    newConditions[workIndex][condition].intensity = parseFloat(e.target.value);
    console.log("改变后的噪声工况", newConditions);
    dispatch(
      // changeNoiseArray[noiceCondiNum](parseFloat(e.target.value))

      changeNoiceAllWorkCondition(newConditions)
    );
  };

  function createTr(
    workCondition: noiceDefaultType,
    condition: string, //condition是英文名
    label: string, //label是中文名
    workIndex: number,
    condiIndex: number,
    isFirst: boolean,
    condiLen: number
  ) {
    // const noiceCondiNum = NoiseNum[label];
    return (
      <tr key={`${workIndex}-${condition}`}>
        {isFirst ? (
          <td rowSpan={condiLen} style={{ width: "9vw" }} className="title-pic">
            <div className="box-box">
              <div className="preWork">
                <span className="title">
                  {workIndex <= 1
                    ? `预设工况${workIndex + 1}`
                    : `自建工况${workIndex + 1}`}
                  <Checkbox
                    value={workIndex}
                    // name="workCheck"
                    onChange={(e) => {
                      checkChangeHandle(e, workIndex);
                    }}
                    // defaultChecked
                    checked={checkList[workIndex] ?? "false"}
                  />
                </span>
              </div>
            </div>
          </td>
        ) : (
          ""
        )}

        <td>{label}</td>
        <td>
          <span className={`intensity ${workIndex}${condition}`}>
            {/* {workCondition.intensity} */}
            <input
              type="number"
              id={label}
              min={noiseDataLimit[condition].min}
              max={noiseDataLimit[condition].max}
              //   defaultValue={workCondition.intensity}
              step={noiseDataLimit[condition].step}
              value={work_allCndition[workIndex][condition].intensity}
              //  value={current}

              onChange={(e) => {
                changeNoiceIntensity(e, workIndex, condition);
              }}
            />
          </span>
        </td>
        {/* <td>
            <span> {workCondition.weight}</span>
          </td> */}
        <td className="note">{NoiseDescribe[label]}</td>
        {isFirst ? (
          <td rowSpan={condiLen} className="adaptRes">
            {run_res.population_score[0]
              ? (run_res.population_score[0] * 100).toFixed(0)
              : ""}
          </td>
        ) : (
          ""
        )}
      </tr>
    );
  }

  //   let count = 0;

  return (
    <NoiseModelWrapper>
      <table className="table_v1 table_color">
        <tbody>
          <tr>
            <td rowSpan={0} style={{ width: "8.5vw" }}>
              可适应能力(物理噪声模型)
            </td>
            <td>说明</td>
            <td colSpan={4}>
              可见光探测器组合：散粒噪声/光子散粒噪声/量化噪声/增益，红外探测器组合：散粒噪声/热噪声/量化噪声/增益
            </td>
          </tr>
          <tr>
            {/* <td rowSpan={tranEntoCh.length + 1}>预设工况I</td> */}
            <td></td>
            <td style={{ width: "11vw" }}>干扰名称</td>
            <td style={{ width: "9vw" }}>作用强度</td>
            {/* <td style={{ width: "7.5vw" }}>权重</td> */}
            <td>备注</td>
            <td style={{ width: "8vw" }}>等级</td>
          </tr>
          {work_allCndition.map((works, workIndex) => {
            const itemworkValue = Object.values(works);
            const itemKeys = Object.keys(works);
            console.log("itemWork", itemworkValue);
            console.log("itemKrys", itemKeys);

            return (
              <Fragment key={workIndex}>
                {itemworkValue.map((item, condiIndex) => {
                  const condition = itemKeys[condiIndex];
                  console.log("现在的noice condition", condition);
                  const label = noiseDataLimit[condition].name;
                  //   const label = ;
                  if (condiIndex == 0)
                    return (
                      <Fragment key={condition}>
                        {createTr(
                          item as any,
                          condition,
                          label,
                          workIndex,
                          condiIndex,
                          true,
                          itemworkValue.length
                        )}
                      </Fragment>
                    );
                  else
                    return (
                      <Fragment key={condition}>
                        {createTr(
                          item as any,
                          condition,
                          label,
                          workIndex,
                          condiIndex,
                          false,
                          itemworkValue.length
                        )}
                      </Fragment>
                    );
                })}
              </Fragment>
            );
          })}
          <tr>
            <td className="bold">得分</td>
            <td>
              {run_res.population_score[0]
                ? (run_res.population_score[0] * 100).toFixed(0)
                : ""}
            </td>
            <td className="bold">总体评价</td>
            <td colSpan={3}>{run_res.overall}</td>
          </tr>
        </tbody>
      </table>
      {/* <Button onClick={clickHandle}>提交</Button> */}
    </NoiseModelWrapper>
  );
};

export default memo(NoiseModel2);
