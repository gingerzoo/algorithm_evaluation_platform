import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import ReactEcharts from "echarts-for-react";

export interface Ires {
  name: string;
  type: string;
  data: number[];
}
interface Iprops {
  children?: ReactNode;
  key: number;
  value: Ires[];
  workName: string[];
}

const Bar: FC<Iprops> = ({ value, workName }) => {
  function getOption() {
    return {
      color: ["#FCCA00", "#73C0DE", "#5470C6", "#EE6666"], // 这是一个雷达图渲染的线的颜色
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        right: "0px",
        orient: "verrical",
        top: "0%"
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: "category",
        data: workName
      },
      series: value
    };
  }

  return (
    <ReactEcharts
      //   ref={chartRef}
      option={getOption()}
      notMerge={true}
      style={{ width: "80%", height: "25vw" }}
    />
  );
};

export default memo(Bar);
