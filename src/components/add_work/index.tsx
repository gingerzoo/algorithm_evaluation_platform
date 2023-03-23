import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { AddworkWrapper } from "./style";
import { Select, SelectProps } from "antd";
import { picWorkCondition, tranEntoCh } from "@/assets/data/local_data";
import { useAppDispatch, useAppSelector } from "@/store";
import Work_config from "../work_config";
import {
  changeConditionList,
  changeIntensityListAction,
  changeWeightListAction,
  changeWorkConditionAction,
  getWorkCondiAction
} from "@/pages/AdaptAbli/store";

interface Iprops {
  children?: ReactNode;
}

const AddWork: FC<Iprops> = (props) => {
  const { workConditions, scene, sceneNum } = useAppSelector((state) => ({
    workConditions: state.adaptAbili.workCondition,
    scene: state.basicConfig.scene,
    sceneNum: state.basicConfig.sceneNum,
    conditionList: state.adaptAbili.conditionList
  }));

  const conditionList = workConditions[sceneNum.toString()];

  const disptach = useAppDispatch();

  //   const options: SelectProps["options"] = conditionList?.map((item) => {
  //     return {
  //       value: item,
  //       label: tranEntoCh[item]
  //     };
  //   });

  const [addCondition, setAddCondis] = useState([""]);

  const [intenList, setIntenList] = useState([0]);

  const [weightList, setWeightList] = useState([0]);

  const options: SelectProps["options"] = picWorkCondition?.map((item) => {
    return {
      value: item,
      label: tranEntoCh[item]
    };
  });

  const handleChange = (value: string[]) => {
    console.log(value);
    setAddCondis(value);
    disptach(changeConditionList(value));
    setIntenList(new Array(value.length).fill(0));
    setWeightList(new Array(value.length).fill(0));
    disptach(changeIntensityListAction(new Array(value.length).fill(0)));

    disptach(changeWeightListAction(new Array(value.length).fill(0)));
  };

  useEffect(() => {
    disptach(getWorkCondiAction());
  }, [scene]);
  return (
    <AddworkWrapper>
      {/* <div className="selected">已选干扰项</div> */}
      <div className="oper">
        <span className="disturb-text">已选干扰项&nbsp;:</span>
        <Select
          mode="tags"
          style={{ flex: "1" }}
          placeholder="选择干扰项"
          onChange={handleChange}
          options={options}
        />
      </div>
      <div className="disturb-config">
        <Work_config
          workCondition={addCondition}
          intenList={intenList}
          weightList={weightList}
        />
      </div>
    </AddworkWrapper>
  );
};

export default memo(AddWork);
