import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { LibraryWrap } from "./style";
import LibraryMap from "@/components/libraryMap";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

interface Iprops {
  children?: ReactNode;
}

const Library: FC<Iprops> = (props) => {
  const [curIndex, setCurIndex] = useState(0);
  const navigate = useNavigate();
  const names = ["文件库", "标准库", "查看全部"];

  function navHandleClick(index: number) {
    if (index !== curIndex) setCurIndex(index);
    if (index == 2) navigate("/annotation");
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
