import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import MyTable2 from "../table2";

interface Iprops {
  children?: ReactNode;
}

const AdapVoice: FC<Iprops> = (props) => {
  return (
    <div>
      <MyTable2 />
    </div>
  );
};

export default memo(AdapVoice);
