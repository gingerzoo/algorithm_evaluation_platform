import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { WorkConfigWrap } from "./style";
import { InputNumber } from "antd";
import { tranEntoCh } from "@/assets/data/local_data";
import { useAppDispatch } from "@/store";
import { changeNewWorkObjAction } from "@/pages/AdaptAbli/store";
import { Iwork } from "@/type";

interface Iprops {
  children?: ReactNode;
  workCondition: string[];
  intenList: number[];
  weightList: number[];
  newWork: Iwork;
}

const WorkConfig: FC<Iprops> = (props) => {
  const { workCondition, newWork, intenList, weightList } = props;

  const dispatch = useAppDispatch();

  const onIntensityChange = (value: number, index: number) => {
    // console.log("weigtList", weightList);
    dispatch(
      changeNewWorkObjAction({
        ...newWork,
        [workCondition[index]]: {
          intensity: value,
          weight: weightList[index]
        }
      })
    );
  };

  const onWeightChange = (value: number, index: number) => {
    // console.log("intentList", intenList);
    dispatch(
      changeNewWorkObjAction({
        ...newWork,
        [workCondition[index]]: {
          intensity: intenList[index],
          weight: value
        }
      })
    );
  };

  return (
    <WorkConfigWrap>
      <thead>
        <tr>
          <th>干扰名称</th>
          <th>强度</th>
          <th>权重</th>
        </tr>
      </thead>
      <tbody>
        {workCondition[0] != "" &&
          workCondition.map((item, index) => {
            return (
              <tr key={item}>
                <td className="condition-Name">{tranEntoCh[item]}</td>
                <td>
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={0}
                    onChange={(value) => {
                      if (typeof value == "number") {
                        onIntensityChange(value, index);
                      }
                    }}
                  />
                </td>
                <td>
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={0}
                    onChange={(value) => {
                      if (typeof value == "number") {
                        onWeightChange(value, index);
                      }
                    }}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </WorkConfigWrap>
  );
};

export default memo(WorkConfig);
