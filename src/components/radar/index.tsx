import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import ReactEcharts from "echarts-for-react";
import { res_measurement } from "@/assets/data/local_data";

export interface Iradar {
  [key: string]: number;
  basic_effectiveness: number;
  adaptablity: number;
  dependability: number;
  multiband: number;
  abstract: number;
  selflearn: number;
}

interface Iprops {
  children?: ReactNode;
  result: Iradar[];
  key?: number;
}

const Radar: FC<Iprops> = (props) => {
  const { result } = props;
  const resLen = result.length;

  //   const chartRef = useRef<EChartsReact>(null);

  // 这是雷达图展示的每个点的数据
  const indicator = res_measurement.map((item) => ({
    name: item,
    // value: result[item.en],
    max: 100
  }));

  const data = result.map((item, index) => ({
    value: Object.values(item),
    name: resLen == 1 ? "总体评价" : `算法${index + 1}`
  }));

  function getOption() {
    // 这里是通过props把参数传进来，并且进行判断
    // if (!item) {
    //   return "";
    // }
    return {
      //   backgroundColor: "#161627",
      color:
        resLen == 1 ? "#7496d2" : ["#FCCA00", "#73C0DE", "#26C3BE", "#FFE434"], // 这是一个雷达图渲染的线的颜色
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
        center: resLen == 1 ? ["50%", "50%"] : ["50%", "56%"],
        radius: "72%",
        //指示器名称和指示器轴的距离。[ default: 15 ]
        axisNameGap: 6,
        triggerEvent: true,
        // 设置雷达图中间射线的颜色
        axisLine: {
          lineStyle: {
            // color: "rgba(238, 197, 102, 0.5)"
            color:
              resLen == 1 ? "rgba(10, 62, 122,0.7)" : "rgba(10, 62, 122,0.2)"
          }
        },
        splitLine: {
          lineStyle: {
            color:
              resLen == 1 ? "rgba(238, 197, 102, 0.5)" : "rgba(10, 62, 122,0.2)"
          }
        },
        // textStyle: {
        //   color: "red",
        //   fontSize: 14
        // },
        //这个是设置每根射线的名称的样式
        axisName: {
          color: resLen == 1 ? "black" : "rgba(10, 62, 122,0.7)",
          //   color: "rgba(78, 76, 76,0.8)",
          textStyle: {
            fontSize: 16 // 设置字体大小
          }
        }
      },
      // 这是雷达图展示的每个点的数据

      // center: ['50%'],
      //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景

      grid: {
        top: "60px"
      },
      series: [
        {
          id: "one",
          type: "radar",
          areaStyle: { opacity: resLen == 1 ? 0.9 : 0.5 },
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

      style={
        resLen == 1
          ? { width: "90%", height: "25vw" }
          : { width: "100%", height: "25vw" }
      }
    />
  );
};

export default memo(Radar);
