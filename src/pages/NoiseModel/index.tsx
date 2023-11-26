import React, { Fragment, memo } from "react";
import type { FC, ReactNode } from "react";
import { NoiseModelWrapper } from "./style";
import { NoiseArray, NoiseNum, noiseTableData } from "@/assets/data/local_data";
import { changeNoiseArray } from "./store";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/store";
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
    gainK2
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
    gainK2: state.noiseModel.gainK2
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

  return (
    <NoiseModelWrapper>
      <table>
        <tbody>
          <tr>
            <th rowSpan={0} style={{ width: "8.5vw" }}>
              物理噪声模型
            </th>
            <th style={{ width: "9vw" }}>物理噪声</th>
            <th style={{ width: "11vw" }}>物理参数(单位)</th>
            <th style={{ width: "13vw" }}>参数输入</th>
            <th>备注</th>
            {/* <th>等级</th> */}
          </tr>
          {noiseTableData.map((item, index) => {
            return (
              <Fragment key={item.title}>
                <tr>
                  <td rowSpan={item.parNum + 1}>{item.title}</td>
                </tr>
                {item.par.map((subItem, subIndex) => {
                  const { name } = subItem;
                  const noiseNum = NoiseNum[name];
                  return (
                    <tr key={noiseNum}>
                      <td>{subItem.name}</td>
                      <td className="para">
                        <input
                          type="number"
                          id={subItem.name}
                          min={subItem.min}
                          max={subItem.max}
                          defaultValue={0}
                          step={10}
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
                    </tr>
                  );
                })}
              </Fragment>
            );
          })}
        </tbody>
      </table>
      {/* <Button onClick={clickHandle}>提交</Button> */}
    </NoiseModelWrapper>
  );
};

export default memo(NoiseModel);
