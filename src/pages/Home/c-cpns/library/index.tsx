import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { LibraryWrap } from "./style";
import LibraryMap from "@/components/libraryMap";
import classNames from "classnames";

interface Iprops {
  children?: ReactNode;
}

const Library: FC<Iprops> = (props) => {
  const names = ["全部", "文件库", "标准库"];
  const [curIndex, setCurIndex] = useState(0);

  function navHandleClick(index: number) {
    if (index !== curIndex) setCurIndex(index);
  }

  return (
    <LibraryWrap>
      <div className="Navi">
        {names.map((item, index) => {
          return (
            <span
              key={index}
              className={classNames({ light: curIndex === index })}
              onClick={() => {
                navHandleClick(index);
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
      <LibraryMap curIndex={curIndex} />
    </LibraryWrap>
  );
};

export default memo(Library);
