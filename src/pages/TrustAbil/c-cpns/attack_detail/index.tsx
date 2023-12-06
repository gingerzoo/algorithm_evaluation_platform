import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { AttackDetWrap } from "./style";
import { TreeSelect } from "antd";

import { attackBlack, attackWhite } from "@/assets/data/local_data";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeTrustBlackNamesAction,
  changeTrustWhiteAction,
  changeTrustWhiteNamesAction
} from "../../store";

interface Iprops {
  children?: ReactNode;
}

interface Idata {
  title: string;
  value: string;
  key: string;
}

const AttackDetail: FC<Iprops> = (props) => {
  //   const { blackNames, whiteNames } = useAppSelector((state) => ({
  //     blackNames: state.trustAbili.blackNames,
  //     whiteNames: state.trustAbili.whiteNames
  //   }));
  const dispatch = useAppDispatch();
  const whiteChild: Idata[] = attackWhite.map((item, index) => ({
    title: item,
    value: `w${item}`,
    key: `w${item}`
  }));

  const blackChild: Idata[] = attackBlack.map((item, index) => ({
    title: item,
    value: `b${item}`,
    key: `b${item}`
  }));
  const treeData = [
    {
      title: "基于白盒的攻击方法",
      value: "0-0",
      key: "0-0",
      children: whiteChild
    },
    {
      title: "基于黑盒的攻击方法",
      value: "0-1",
      key: "0-1",
      children: blackChild
    }
  ];

  const [value, setValue] = useState<string[]>();

  const onChange = (newValue: string[]) => {
    console.log("白盒黑盒", typeof newValue);
    const whiteNames: string[] = [];
    const blackNames: string[] = [];

    newValue.forEach((item) => {
      if (item.startsWith("w")) {
        whiteNames.push(item.slice(1));
      } else {
        blackNames.push(item.slice(1));
      }
    });
    dispatch(changeTrustBlackNamesAction(blackNames));
    dispatch(changeTrustWhiteNamesAction(whiteNames));
    setValue(newValue);
    // if(newValue.startsWith("w"){
    //     dispatch

    // })
  };

  return (
    <AttackDetWrap>
      {/* <div className="left">

      </div>
      <div className="right"></div> */}
      <div className="box">
        <TreeSelect
          showSearch
          style={{ width: "70%" }}
          value={value}
          size="large"
          // dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="请选择盒模型"
          allowClear
          multiple
          treeCheckable={true}
          treeDefaultExpandAll
          onChange={onChange}
          treeData={treeData}
        />
      </div>
    </AttackDetWrap>
  );
};

export default memo(AttackDetail);
