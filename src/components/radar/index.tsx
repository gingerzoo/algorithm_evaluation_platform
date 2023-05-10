import React, { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

import { RadarWrap } from "./style";
import { resultName } from "@/assets/data/local_data";

interface Iitem {
  [key: string]: number;
  basic: number;
  adapt: number;
  trust: number;
  abstract: number;
  collaAware: number;
}

interface Iprops {
  children?: ReactNode;
  results: Iitem[];
}

const Radar: FC<Iprops> = (props) => {
  const { results } = props;
  const chartRef = useRef<ReactEcharts>(null);

  const echartsInstanceRef = useRef<echarts.ECharts | null>(null);
  // 这是雷达图展示的每个点的数据
  const indicator = resultName.map((item) => ({
    text: item.ch,
    max: 100
  }));

  const data = results.map((r: Iitem) => ({
    value: [r.basic, r.adapt, r.trust, r.abstract, r.collaAware]
  }));

  function getOption() {
    // 这里是通过props把参数传进来，并且进行判断
    // if (!item) {
    //   return "";
    // }
    return {
      color: "#E4C477", // 这是一个雷达图渲染的线的颜色
      //点击提示标签
      // tooltip: {},

      radar: {
        indicator: indicator,
        //雷达图绘制类型，支持 'polygon' 和 'circle' [ default: 'polygon' ]
        // shape: 'polygon',
        splitNumber: 5,
        center: ["50%", "50%"],
        // radius: "65%",
        //指示器名称和指示器轴的距离。[ default: 15 ]
        // axisNameGap: 3,
        triggerEvent: true,
        // 设置雷达图中间射线的颜色
        axisLine: {
          lineStyle: {
            color: "#ddd"
          }
        },
        axisName: {
          //这是一个文字的样式
          textStyle: {
            color: "#999",
            backgroundColor: "transparent"
            // borderRadius: 3,
            // padding: [3, 5]
          }
        }
      },
      // 这是雷达图展示的每个点的数据
      calculable: true,
      //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
      splitArea: {
        show: false,
        areaStyle: {
          color: "green" // 图表背景的颜色
        }
      },
      series: [
        {
          type: "radar",
          //显示雷达图选中背景
          // data中的对象就是雷达图中的每一组数据，若是只有一组数据默认雷达图的线数据只有一条
          data: data // 里面的颜色也是传递进来的color
        }
      ]
    };
  }

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().setOption(getOption());
    }
    // if (chartRef.current && echartsInstanceRef.current) {
    //   echartsInstanceRef.current.setOption({
    //     getOption
    //   });
    // }
  }, []);

  return (
    <RadarWrap>
      <ReactEcharts
        ref={chartRef}
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        // onEvents={}
        // onChartReady={onChartReady}
        style={{ width: "300px", height: "600px" }}
      />
    </RadarWrap>
  );
};

export default memo(Radar);
