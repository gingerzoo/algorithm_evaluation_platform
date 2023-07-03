import React, { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";

import { RadarWrap } from "./style";
import { resultName, sceneToNum } from "@/assets/data/local_data";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import {
  changeAlgoListAction,
  changeSceneAction,
  changeSceneNumAction,
  changeSelectedSceneAction,
  getAlogListAction
} from "@/pages/BasicConfig/store";

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
}

// interface EventHandlers {
//   [eventName: string]: () => void;
// }

const Sunburst: FC<Iprops> = (props) => {
  //   const { result } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const labels = new Array(7).fill(0).map((item, index) => {
    const radius1 = index == 1 ? 20 : 70 + (index - 2) * 18;
    const radius2 = index == 1 ? 70 : 70 + (index - 1) * 18;
    return {
      label: {
        rotate: "tangential"
      },
      r0: radius1,
      r: radius2
    };
  });

  const data1 = [
    {
      name: "导航",
      value: "ttt",
      dataType: "navigate",

      label: {
        fontWeight: "bold",
        fontSize: 12
        //   color: "white"
      },
      children: [
        {
          value: 3,
          name: "相关性",
          silent: true
        },
        {
          value: 3,
          name: "互信息",
          silent: true
        },
        {
          value: 3,
          name: "定位精度",
          silent: true
        }
      ],
      emphasis: {
        label: {
          show: true,
          position: "inside",

          fontSize: 14
        },
        itemStyle: {
          opacity: 0.7
        }
      }
    },
    {
      name: "导引",
      dataType: "guide",
      label: {
        fontWeight: "bold",
        fontSize: 12
      },
      emphasis: {
        label: {
          show: true,
          position: "inside",
          fontSize: 14
        },
        itemStyle: {
          opacity: 0.7
        }
      },
      children: [
        {
          name: "中心位置误差",
          value: 4
        },
        {
          name: "区域重叠度",
          value: 4
        },
        {
          name: "跟踪鲁棒性",
          value: 5
        }
      ]
    },

    {
      name: "遥感",
      dataType: "remote",
      emphasis: {
        label: {
          show: true,
          position: "inside",
          fontSize: 14
        },
        itemStyle: {
          opacity: 0.7
        }
      },
      label: {
        fontWeight: "bold",
        fontSize: 12
      },
      children: [
        {
          name: "F1-score",
          value: 4
        },
        {
          name: "mAP",
          value: 4
        },
        {
          name: "mar",
          value: 5
        }
      ]
    },
    {
      name: "语音",
      dataType: "voice",
      emphasis: {
        label: {
          show: true,
          position: "inside",
          fontSize: 14
        },
        itemStyle: {
          opacity: 0.7
        }
      },
      label: {
        fontWeight: "bold",
        fontSize: 12
      },
      children: [
        {
          name: "字错误率",
          value: 4
        },
        {
          name: "句错误率",
          value: 4
        }
      ]
    }
  ];

  const data2 = [
    {
      name: "导航",
      value: 10,
      dataType: "navigate",

      label: {
        fontWeight: "bold",
        fontSize: 14
      },
      children: [
        {
          value: 10,
          name: "可适应性",
          children: [
            {
              value: 9,
              name: "可信赖性",
              children: [
                {
                  value: 8,
                  name: "自学习能力",
                  children: [
                    {
                      value: 7,
                      name: "协同感知"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      emphasis: {
        label: {
          show: true,
          position: "inside",
          fontSize: 16
        },
        itemStyle: {
          opacity: 0.7
        }
      }
    },
    {
      name: "导引",
      dataType: "guide",
      value: 7,
      label: {
        fontWeight: "bold",
        fontSize: 14
      },
      emphasis: {
        label: {
          show: true,
          position: "inside",
          fontSize: 16
        },
        itemStyle: {
          opacity: 0.7
        }
      },
      children: [
        {
          value: 6,
          name: "可适应性",
          children: [
            {
              value: 5,
              name: "可信赖性",
              children: [
                {
                  value: 4,
                  name: "自学习能力"
                }
              ]
            }
          ]
        }
      ]
    },

    {
      name: "遥感",
      dataType: "remote",
      value: 7,
      emphasis: {
        label: {
          show: true,
          position: "inside",
          fontSize: 16
        },
        itemStyle: {
          opacity: 0.7
        }
      },
      label: {
        fontWeight: "bold",
        fontSize: 14
      },
      children: [
        {
          value: 7,
          name: "可适应性",
          children: [
            {
              value: 7,
              name: "可信赖性",
              children: [
                {
                  value: 6,
                  name: "自学习能力",
                  children: [
                    {
                      value: 5,
                      name: "协同感知",
                      children: [
                        {
                          value: 4,
                          name: "抽象感知",
                          silent: true
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "语音",
      dataType: "voice",
      value: 5,
      emphasis: {
        label: {
          show: true,
          position: "inside",
          fontSize: 16
        },
        itemStyle: {
          opacity: 0.7
        }
      },
      label: {
        fontWeight: "bold",
        fontSize: 14
      },
      children: [
        {
          value: 5,
          name: "可适应性",
          children: [
            {
              value: 3,
              name: "可信赖性"
            }
          ]
        }
      ]
    }
  ];

  type EventHandlers = Record<string, (params: any) => void>;

  const onEvents: EventHandlers = {
    click: (params: any) => {
      // 判断点击的元素是否为祖先元素
      //   params.event.preventDefault();
      const seletcedScene = params.data.dataType;
      const selectedSceneNum = sceneToNum[seletcedScene];
      if (
        seletcedScene === "navigate" ||
        seletcedScene === "guide" ||
        seletcedScene === "remote" ||
        seletcedScene === "voice"
      ) {
        dispatch(changeSceneAction(seletcedScene));
        dispatch(changeSceneNumAction(selectedSceneNum));
        dispatch(changeSelectedSceneAction(true));
        dispatch(getAlogListAction());
        navigate("/profile/config");
      } else {
        // params.event.cancelBubble = false;
        // params.event.stop();
        // params.event.defaultPrevented = true;
        console.log("我想让你不要动！", params.data.parent);
      }

      console.log("hi", params);
    }

    // 其他事件处理函数...
  };

  function getOption() {
    // 这里是通过props把参数传进来，并且进行判断
    // if (!item) {
    //   return "";
    // }
    return {
      //   "#ED7D31"
      color: ["#73C0DE", "#FCCA00", "#26C3BE", "#7496d2"], // 这是一个雷达图渲染的线的颜色
      //点击提示标签

      //   visualMap: {
      //     type: "continuous",
      //     min: 0,
      //     max: 10,
      //     inRange: {
      //       color: ["#2F93C8", "#AEC48F", "#FFDB5C", "#F98862"]
      //       //   color: ["#73C0DE", "#FCCA00", "#26C3BE", "#7496d2"]
      //     }
      //   },

      series: [
        {
          id: "one",
          radius: ["17%", "95%"],
          center: ["50%", "50%"],
          type: "sunburst",
          //废弃了这个属性
          emphasis: {
            focus: "descendant"
          },
          label: {
            // formatter: "tangential",
            show: true,
            position: "inside",

            //   color: "white"
            fontSize: 9,
            color: "rgba(78, 76, 76,0.8)"
          },
          levels: labels,

          areaStyle: { opacity: 0.5 },
          //显示雷达图选中背景
          // data中的对象就是雷达图中的每一组数据，若是只有一组数据默认雷达图的线数据只有一条
          data: data2
        }
      ],
      downplay: {
        itemStyle: {
          color: "#ccc"
        }
      }
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
      onEvents={onEvents}
    />
  );
};

export default memo(Sunburst);
