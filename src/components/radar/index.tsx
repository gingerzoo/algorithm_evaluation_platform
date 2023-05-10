import React, { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

import { RadarWrap } from "./style";
import { resultName } from "@/assets/data/local_data";

interface Iitem {
  [key: string]: number;
  adapt: number;
  basic: number;
  trust: number;
  selfLearn: number;
  abstract: number;
  collaAware: number;
}

interface Iprops {
  children?: ReactNode;
  result: Iitem[];
}

const Radar: FC<Iprops> = (props) => {
  const { result } = props;

  //   const chartRef = useRef<EChartsReact>(null);

  // 这是雷达图展示的每个点的数据
  const indicator = resultName.map((item) => ({
    name: item.ch,
    // value: result[item.en],
    max: 100
  }));

  const data = result.map((item, index) => ({
    value: Object.values(item),
    name: `算法${index + 1}`
  }));

  function getOption() {
    // 这里是通过props把参数传进来，并且进行判断
    // if (!item) {
    //   return "";
    // }
    return {
      //   backgroundColor: "#161627",
      color: ["#73C0DE", "#FCCA00", "#26C3BE", "#FFE434"], // 这是一个雷达图渲染的线的颜色
      //点击提示标签
      // tooltip: {},
      legend: {
        //图例显示在顶部
        top: 0,
        right: 0,
        //图例背景颜色
        backgroundColor: "transparent",
        // 图例标记的图形宽度。[ default: 25 ]
        itemWidth: 30,
        // 图例标记的图形高度。[ default: 14 ]
        itemHeight: 18,
        //图例之间的间距
        itemGap: 15
        // data: ["算法1", "算法2"]
      },
      tooltip: {
        trigger: "item"
      },
      radar: {
        // shape: "circle",
        indicator: indicator,
        splitNumber: 5,
        center: ["50%", "56%"],
        radius: "72%",
        //指示器名称和指示器轴的距离。[ default: 15 ]
        axisNameGap: 6,
        triggerEvent: true,
        // 设置雷达图中间射线的颜色
        axisLine: {
          lineStyle: {
            color: "rgba(238, 197, 102, 0.5)"
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(10, 62, 122,0.2)"
          }
        },
        // textStyle: {
        //   color: "red",
        //   fontSize: 14
        // },
        //这个是设置每根射线的名称的样式
        axisName: {
          color: "rgba(78, 76, 76,0.8)",
          textStyle: {
            fontSize: 16 // 设置字体大小
          }
          //   backgroundColor: "rgba(228, 196, 119,0.7)",
          //   borderRadius: 3,
          //   padding: [4, 4, 2, 4]
        }
      },
      // 这是雷达图展示的每个点的数据

      // center: ['50%'],
      //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
      splitArea: {
        show: false
        // areaStyle: {
        //   color: ["#77EADF", "#26C3BE", "#64AFE9", "#428BD4", "#E4C477"],
        //   shadowColor: "rgba(0, 0, 0, 0.2)",
        //   shadowBlur: 10
        // }
      },
      grid: {
        top: "60px"
      },
      series: [
        {
          id: "one",
          type: "radar",
          areaStyle: { opacity: 0.5 },
          //显示雷达图选中背景
          // data中的对象就是雷达图中的每一组数据，若是只有一组数据默认雷达图的线数据只有一条
          data: data
        }
      ]
    };
  }

  //   useEffect(() => {
  //     if (chartRef.current) {
  //       chartRef.current.getEchartsInstance().setOption(getOption());
  //     }
  //   }, []);

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

export default memo(Radar);
