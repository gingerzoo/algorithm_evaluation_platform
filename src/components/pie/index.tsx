import React, { memo } from "react";
import type { FC, ReactNode } from "react";

import ReactEcharts from "echarts-for-react";
import { useAppSelector } from "@/store";
import { IbasicRes } from "@/type";
import { basicResList } from "@/assets/data/local_data";

interface Ipie {
  value: number;
  name: string;
}

interface Iprops {
  children?: ReactNode;
  key?: number;
  data: Ipie[];
}

const Pie: FC<Iprops> = ({ data }) => {
  const { scene, basic_result, sceneNum } = useAppSelector((state) => ({
    basic_result: state.basicEffect,
    scene: state.basicConfig.scene,
    sceneNum: state.basicConfig.sceneNum
  }));

  function getOption() {
    return {
      color: ["#FCCA00", "#73C0DE", "#5470C6", "#EE6666"], // 这是一个雷达图渲染的线的颜色
      tooltip: {
        trigger: "item"
      },

      legend: {
        orient: "horizontal",
        right: "10px",
        top: "15px",
        itemGap: 15
      },

      grid: {
        top: "60px"
      },
      series: [
        {
          id: "one",
          type: "pie",
          radius: "50%",

          data: data,
          //   [
          //     { value: 1048, name: 'Search Engine' },
          //     { value: 735, name: 'Direct' },
          //     { value: 580, name: 'Email' },
          //     { value: 484, name: 'Union Ads' },
          //     { value: 300, name: 'Video Ads' }
          //   ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }

  return (
    <ReactEcharts
      //   ref={chartRef}
      option={getOption()}
      notMerge={true}
      //   lazyUpdate={true}
      //   onEvents={}
      // onChartReady={onChartReady}

      style={{ width: "100%", height: "25vw" }}
    />
  );
};

export default memo(Pie);
