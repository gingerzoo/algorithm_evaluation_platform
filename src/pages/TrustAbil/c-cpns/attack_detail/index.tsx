import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { AttackDetWrap } from "./style";
import { TreeSelect } from "antd";

import { attackBlack, attackWhite } from "@/assets/data/local_data";

interface Iprops {
  children?: ReactNode;
}

interface Idata {
  title: string;
  value: string;
  key: string;
}

const AttackDetail: FC<Iprops> = (props) => {
  const whiteChild: Idata[] = attackWhite.map((item, index) => ({
    title: item,
    value: item,
    key: item
  }));

  const blackChild: Idata[] = attackBlack.map((item, index) => ({
    title: item,
    value: item,
    key: item
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

  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <AttackDetWrap>
      {/* <div className="left">

      </div>
      <div className="right"></div> */}
      <div className="box">
        <TreeSelect
          showSearch
          style={{ width: "82%" }}
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
