import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { MenuItemWrap } from "./style";
import { IruleData } from "@/type";

interface Iprops {
  children?: ReactNode;
  info: IruleData;
  key: string;
}

const MenuItem: FC<Iprops> = ({ info }) => {
  const {
    category,
    country,
    time,
    title,
    introduction,
    scenario,
    publisher,
    website
  } = info;
  return (
    <MenuItemWrap>
      <a href={website} target="_blank" rel="noreferrer">
        {title}
      </a>
      <p>时间：{time}</p>
      <p>国家：{country}</p>
      <p>应用场景：{scenario}</p>
      <p>发布方：{publisher}</p>
      <p className="describe">简介：{introduction}</p>
    </MenuItemWrap>
  );
};

export default memo(MenuItem);
