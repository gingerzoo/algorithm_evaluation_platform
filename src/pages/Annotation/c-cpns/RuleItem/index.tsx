import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { IruleData } from "@/assets/data/local_data";
// import { ruleItemWrap } from "./style";

interface Iprops {
  children?: ReactNode;
  key: string;
  info: IruleData;
}

const RuleItem: FC<Iprops> = ({ info }) => {
  const {
    website,
    title,
    time,
    country,
    category,
    scenario,
    publisher,
    introduction
  } = info;
  return (
    <div>
      <a href={website}>{title}</a>
      <p>时间：{time}</p>
      <p>国家：{country}</p>
      <p>应用场景：{scenario}</p>
      <p>发布方：{publisher}</p>
      <p>简介：{introduction}</p>
    </div>
  );
};

export default memo(RuleItem);
