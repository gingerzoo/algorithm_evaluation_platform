import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { LibraryWrap } from "./style";

interface Iprops {
  children?: ReactNode;
}

const Library: FC<Iprops> = (props) => {
  return <LibraryWrap>Library</LibraryWrap>;
};

export default memo(Library);
