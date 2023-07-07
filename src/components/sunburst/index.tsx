import React, { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import ReactEcharts from "echarts-for-react";
import { resultName, sceneToNum } from "@/assets/data/local_data";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import {
  changeSceneAction,
  changeSceneNumAction,
  changeSelectedSceneAction,
  getAlogListAction
} from "@/pages/BasicConfig/store";
import { changePageSceneAction, getImgAction } from "@/pages/AdaptAbli/store";

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
      name: "自动导航",
      value: 6,
      dataType: "navigate",

      label: {
        fontWeight: "bold",
        fontSize: 12
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
                  name: "自学习能力",
                  children: [
                    {
                      value: 4,
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
          fontSize: 14
        },
        itemStyle: {
          opacity: 0.7
        }
      }
    },

    {
      name: "精确追踪",
      dataType: "guide",
      value: 6,
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
      name: "协同感知",
      dataType: "coin",
      value: 6,
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
      }
    },

    {
      name: "遥感侦察",
      dataType: "remote",
      value: 6,
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
          value: 6,
          name: "可适应性",
          children: [
            {
              value: 6,
              name: "可信赖性",
              children: [
                {
                  value: 5,
                  name: "自学习能力",
                  children: [
                    {
                      value: 3,
                      name: "协同感知",
                      children: [
                        {
                          value: 5,
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
      name: "语音识别",
      dataType: "voice",
      value: 6,
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
      dispatch(changePageSceneAction(seletcedScene));
      const selectedSceneNum = sceneToNum[seletcedScene];
      dispatch(
        getImgAction({ workIndex: 1, pageScene: "navigate", sceneNum: 2 })
      );
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
      color: ["#73C0DE", "#FCCA00", "#26C3BE", "#7496d2", "#ED7D31"], // 这是一个雷达图渲染的线的颜色

      series: [
        {
          id: "one",
          radius: ["19%", "95%"],
          center: ["50%", "45%"],
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
      style={{ width: "100%", height: "28vw" }}
      onEvents={onEvents}
    />
  );
};

export default memo(Sunburst);
