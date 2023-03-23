import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { WorkConfigWrap } from "./style";
import { InputNumber } from "antd";
import { tranEntoCh } from "@/assets/data/local_data";
import { useAppDispatch } from "@/store";
import {
  changeIntensityListAction,
  changeWeightListAction
} from "@/pages/AdaptAbli/store";
import userEvent from "@testing-library/user-event";

interface Iprops {
  children?: ReactNode;
  workCondition: string[];
  intenList: number[];
  weightList: number[];
}

const WorkConfig: FC<Iprops> = (props) => {
  const { workCondition, intenList, weightList } = props;

  const dispatch = useAppDispatch();

  const [chaIntenList, setIntenList] = useState(intenList);

  const [chaWeigList, setWeigList] = useState(weightList);

  const onIntensityChange = (value: number, index: number) => {
    const newIntenWork = [...chaIntenList];

    newIntenWork[index] = value;
    // setIntenList(newIntenWork);
    setIntenList(newIntenWork);
    console.log("intentChange", newIntenWork);
    dispatch(changeIntensityListAction(newIntenWork));
  };

  const onWeightChange = (value: number, index: number) => {
    const newWeightWork = [...chaWeigList];

    newWeightWork[index] = value;
    // setWeightList(newWeightWork);
    setWeigList(newWeightWork);

    console.log("weightChange", newWeightWork);
    dispatch(changeWeightListAction(newWeightWork));
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
