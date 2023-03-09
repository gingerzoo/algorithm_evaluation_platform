import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { GreenWrap } from "./style";

interface Iprops {
  children?: ReactNode;
}

const GreenHand: FC<Iprops> = (props) => {
  return (
    <GreenWrap>
      <h2>新手手册</h2>
      <p>
        我真的不知道该说些什么啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
      </p>
    </GreenWrap>
  );
};

export default memo(GreenHand);
