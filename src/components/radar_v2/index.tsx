import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import ReactEcharts from "echarts-for-react";
type Idata = {
  value: number[];
  name: string;
};

type Iindicater = {
  name: string;
  max: number;
};
interface Iprops {
  children?: ReactNode;
  data: Idata[];
  indicator: Iindicater[];
  isAll_res: boolean;
}

const RadarV2: FC<Iprops> = (props) => {
  const { data, indicator, isAll_res } = props;
  function getOption() {
    // 这里是通过props把参数传进来，并且进行判断
    // if (!item) {
    //   return "";
    // }
    return {
      //   backgroundColor: "#161627",
      color: [
        "#205eca",
        "#FFE434",
        "rgb(54, 178, 227)",
        "#e75f3d",
        "rgb(27, 191, 131)"
      ], // 这是一个雷达图渲染的线的颜色
      //点击提示标签
      // tooltip: {},
      legend: {
        //图例显示在顶部
        top: 0,
        right: 0,
        //图例背景颜色
        backgroundColor: "transparent",
        // 图例标记的图形宽度。[ default: 25 ]
        itemWidth: isAll_res ? 20 : 40,
        // 图例标记的图形高度。[ default: 14 ]
        itemHeight: isAll_res ? 12 : 24,
        //图例之间的间距
        itemGap: 15,
        orient: isAll_res ? "vertical" : "horizontal"
      },
      tooltip: {
        trigger: "item"
      },
      radar: {
        indicator: indicator,
        splitNumber: 5,
        center: ["50%", "50%"],
        radius: "85%",
        //指示器名称和指示器轴的距离。[ default: 15 ]
        axisNameGap: 6,
        triggerEvent: true,
        // 设置雷达图中间射线的颜色
        axisLine: {
          lineStyle: {
            color: "rgba(10, 62, 122,0.4)"
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(10, 62, 122,0.4)"
          }
        },
        axisName: {
          color: "rgba(10, 62, 122,0.5)",
          //   color: "rgba(78, 76, 76,0.8)",
          textStyle: {
            fontSize: 16 // 设置字体大小
          }
        }
      },
      // 这是雷达图展示的每个点的数据

      // center: ['50%'],
      //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景

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
  return (
    <ReactEcharts
      //   ref={chartRef}
      option={getOption()}
      notMerge={true}
      //   lazyUpdate={true}
      //   onEvents={}
      // onChartReady={onChartReady}

      //   style={{ width: "100%", height: "30vw" }}
      style={
        isAll_res
          ? { width: "100%", height: "25vw" }
          : { width: "100%", height: "30vw" }
      }
    />
  );
};

export default memo(RadarV2);
