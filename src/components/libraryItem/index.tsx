import React, { memo } from "react";
import type { FC } from "react";
import { LibraryItemWrap } from "@/components/libraryItem/style";
import FilePdfTwoTone from "@ant-design/icons/lib/icons/FilePdfTwoTone";

interface Iprops {
  key: number;
  title: string;
  website: string;
  time: number;
  publisher: string;
}

const LibraryItem: FC<Iprops> = (props) => {
  return (
    <LibraryItemWrap>
      <div className="title">
        <FilePdfTwoTone twoToneColor="#0763ac" />
        <a href={props.website} target="_blank" rel="noreferrer">
          {props.title}
        </a>
      </div>
      <p className="pub_info">
        <span className="publisher">发布者：{props.publisher}</span>
        <span className="time">{props.time}</span>
      </p>
    </LibraryItemWrap>
  );
};

export default LibraryItem;
