import React, { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import { LibraryItemWrap } from "@/components/libraryItem/style";
import { resultName } from "@/assets/data/local_data";
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
