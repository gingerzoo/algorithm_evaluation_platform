import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import ReactEcharts from "echarts-for-react";

interface Ires {
  name: string;
  type: string;
  data: number[];
}

interface Iprops {
  children?: ReactNode;
  key: number;
  value: Ires[];
  category: string[];
}

const Line: FC<Iprops> = ({ value, category }) => {
  function getOption() {
    return {
      color: ["#5470C6", "#73C0DE", "#FCCA00", "#EE6666"], // 这是一个雷达图渲染的线的颜色
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        // orient: "horizontal",
        right: "right",
        orient: "verrical",
        top: "0%"
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      //   toolbox: {
      //     show: true,
      //     feature: {
      //       dataZoom: {
      //         yAxisIndex: "none"
      //       },
      //       dataView: { readOnly: false },
      //       magicType: { type: ["line", "bar"] },
      //       restore: {},
      //       saveAsImage: {}
      //     }
      //   },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: category
      },
      yAxis: {
        type: "value"
      },
      series: value
    };
  }

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <ReactEcharts
      //   ref={chartRef}
      option={getOption()}
      notMerge={true}
      style={{ width: "90%", height: "25vw" }}
    />
  );
};

export default memo(Line);
