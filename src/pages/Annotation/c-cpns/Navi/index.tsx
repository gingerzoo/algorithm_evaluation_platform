import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { NaviWrap } from "./style";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface Iprops {
  children?: ReactNode;
  category: string;
  context: string;
  curCate: string;
  btnClickHandle: (curCategory: string) => void;
}

const Rule_Nav: FC<Iprops> = ({
  category,
  context,
  btnClickHandle,
  curCate
}) => {
  return (
    <NaviWrap>
      <a
        onClick={() => {
          btnClickHandle(category);
          console.log("now_________category", category);
          console.log("pre_________category", curCate);
        }}
        className={classNames({ active: category === curCate })}
      >
        {context}
      </a>
    </NaviWrap>
  );
};

export default memo(Rule_Nav);
