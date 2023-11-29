import React, { Fragment, memo } from "react";
import type { FC, ReactNode } from "react";
import { NoiseModelWrapper } from "./style";
import { NoiseArray, NoiseNum, noiseTableData } from "@/assets/data/local_data";
import { changeNoiseArray } from "./store";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/store";
import Basic_result from "../BasicConfig/c-cpns/basic_result";
import { IbasicRes } from "@/type";
// import { Button } from "antd";

interface Iprops {
  children?: ReactNode;
}

const NoiseModel: FC<Iprops> = () => {
  const dispatch = useDispatch();

  const {
    current,
    bandwidth,
    exposureTime,
    photonCount,
    temperature,
    resistance,
    thermalBandwidth,
    minQuantizationUnit,
    gainK1,
    gainK2,
    run_res,
    sceneNum
  } = useAppSelector((state) => ({
    current: state.noiseModel.current,
    bandwidth: state.noiseModel.bandwidth,
    exposureTime: state.noiseModel.exposureTime,
    photonCount: state.noiseModel.photonCount,
    temperature: state.noiseModel.temperature,
    resistance: state.noiseModel.resistance,
    thermalBandwidth: state.noiseModel.tbandwidth,
    minQuantizationUnit: state.noiseModel.mqUnit,
    gainK1: state.noiseModel.gainK1,
    gainK2: state.noiseModel.gainK2,
    run_res: state.noiseModel.work_result,
    sceneNum: state.basicConfig.sceneNum
  }));

  const noiseArray = [
    current,
    bandwidth,
    exposureTime,
    photonCount,
    temperature,
    resistance,
    thermalBandwidth,
    minQuantizationUnit,
    gainK1,
    gainK2
  ];

  const clickHandle = () => {
    console.log(noiseArray);
  };

  let count = 0;

  return (
    <NoiseModelWrapper>
      <table>
        <tbody>
          <tr>
            <th rowSpan={11} style={{ width: "7.8vw" }}>
              物理噪声模型
            </th>
            <th style={{ width: "8.2vw" }}>噪声名称</th>
            <th style={{ width: "10vw" }}>物理参数(单位)</th>
            <th style={{ width: "12vw" }}>参数输入</th>
            <th>备注</th>
            <th style={{ width: "3vw" }}>等级</th>
            {/* <th>等级</th> */}
          </tr>
          {noiseTableData.map((item, index) => {
            count += item.parNum;
            return (
              <Fragment key={item.title}>
                {/* <tr>
                  <td rowSpan={item.parNum + 1}>{item.title}</td>
                </tr> */}
                {/* <td rowSpan={item.parNum + 1}>{item.title}</td> */}
                {item.par.map((subItem, subIndex) => {
                  const { name } = subItem;
                  const noiseNum = NoiseNum[name];

                  return (
                    <tr key={noiseNum}>
                      {count == subItem.curIndex + item.parNum && (
                        <td rowSpan={item.parNum}>{item.title}</td>
                      )}
                      <td>{subItem.name}</td>
                      <td className="para">
                        <input
                          type="number"
                          id={subItem.name}
                          min={subItem.min}
                          max={subItem.max}
                          //   defaultValue={subItem.defaultValue}
                          step={subItem.step}
                          value={noiseArray[subItem.curIndex]}
                          //  value={current}

                          onChange={(e) => {
                            dispatch(
                              changeNoiseArray[noiseNum](
                                parseFloat(e.target.value)
                              )
                            );
                          }}
                        />
                        <span className="para-range">
                          {subItem.min}~{subItem.max}
                        </span>
                      </td>
                      {subIndex === 0 && (
                        <td rowSpan={item.parNum} className="log">
                          {item.log}
                        </td>
                      )}
                      {subItem.curIndex === 0 && (
                        <td rowSpan={10} className="rate bold">
                          {run_res.condition_result[0]}
                        </td>
                      )}
                      {/* <td colSpan={14}>A</td> */}
                    </tr>
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

export default memo(NoiseModel);
