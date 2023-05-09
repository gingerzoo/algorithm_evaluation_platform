import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { AddworkWrapper } from "./style";
import { Select, SelectProps } from "antd";
import {
  picWorkCondition,
  sceneToNum,
  tranEntoCh
} from "@/assets/data/local_data";
import { useAppDispatch, useAppSelector } from "@/store";
import Work_config from "../work_config";
import {
  changeConditionList,
  changeNewWorkObjAction,
  getWorkCondiAction
} from "@/pages/AdaptAbli/store";

interface Iprops {
  children?: ReactNode;
  pageScene: string;
}

const AddWork: FC<Iprops> = (props) => {
  const { WorkObj, workCondition } = useAppSelector((state) => ({
    WorkObj: state.adaptAbili.newWorkObj,
    workCondition: state.adaptAbili.workCondition
  }));

  const disptach = useAppDispatch();
  const sceneNum = sceneToNum[props.pageScene];
  const [addCondition, setAddCondis] = useState([""]);
  //   console.log("workCondition", workCondition);

  const options: SelectProps["options"] = workCondition[sceneNum].map(
    (item) => {
      return {
        value: item,
        label: tranEntoCh[item]
      };
    }
  );

  //   const options: SelectProps["options"] = picWorkCondition.map((item) => {
  //     return {
  //       value: item,
  //       label: tranEntoCh[item]
  //     };
  //   });

  const handleChange = (value: string[]) => {
    setAddCondis(value);
    console.log("value", value);
    console.log("addCondition", addCondition);
    console.log("preworkobj", WorkObj);

    const newWorkObj = { ...WorkObj };
    if (value.length >= addCondition.length) {
      Object.defineProperty(newWorkObj, value[value.length - 1], {
        value: {
          intensity: 0,
          weight: 0
        },
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      const myCondition = addCondition.filter((item) => !value.includes(item));
      console.log("myCondition", myCondition);
      delete newWorkObj[myCondition[0]];
    }

    disptach(changeConditionList(value));
    disptach(changeNewWorkObjAction(newWorkObj));
    console.log("newWorkObj", newWorkObj);
  };

  useEffect(() => {
    disptach(getWorkCondiAction());
  }, [props.pageScene]);
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
          intenList={Object.values(WorkObj).map((item) => item.intensity)}
          weightList={Object.values(WorkObj).map((item) => item.weight)}
          newWork={WorkObj}
        />
      </div>
    </AddworkWrapper>
  );
};

export default memo(AddWork);
