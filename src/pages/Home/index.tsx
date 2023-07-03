import React, { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { HomeWrapper } from "./style";
import circle from "@/assets/images/circle.png";
import Radar from "@/components/radar";
import ReactEcharts from "echarts-for-react";
import EChartsReact from "echarts-for-react";
import echarts from "echarts";
import {
  AlertOutlined,
  BorderOuterOutlined,
  EyeOutlined,
  RadarChartOutlined,
  SlidersOutlined
} from "@ant-design/icons";
import Sunburst from "@/components/sunburst";
import { useAppDispatch } from "@/store";
import { changeAlgoListAction } from "../BasicConfig/store";
import Library from "./c-cpns/library";
interface Iprops {
  children?: ReactNode;
}

const Home: FC<Iprops> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const chartRef = useRef<EChartsReact>(null);

  function useBtnClick() {
    navigate(`/profile`);
  }

  const options = {
    radar: {
      indicator: [
        { name: "维度1", max: 100 },
        { name: "维度2", max: 100 },
        { name: "维度3", max: 100 },
        { name: "维度4", max: 100 },
        { name: "维度5", max: 100 },
        { name: "维度6", max: 100 }
      ],
      splitNumber: 5 // 设置每个维度轴线的分割段数为 4
    },

    series: [
      {
        type: "radar",
        data: [
          {
            value: [60, 73, 85, 40, 62]
          }
        ]
      }
    ]
  };

  return (
    <HomeWrapper>
      <header>
        <div className="center">
          <div className="top">
            <h1 className="page-name"> 感知分级算法评估平台</h1>
            <h5 className="desc">
              提供基础效能、可依赖性、可适应性、协同感知和抽象感知等多维度测试
            </h5>
          </div>

          <div className="opeBar">
            <button onClick={useBtnClick}>立即使用</button>

            <a href="http://101.42.40.81:8080/guidance_info/label_format.pdf">
              技术文档
            </a>
            {/* </button> */}
          </div>
        </div>
      </header>
      <main>
        <section className="freedom">
          <h2>
            <AlertOutlined className="icon" />
            <span className="title">全方位覆盖</span>
          </h2>
          {/* <img src={circle} /> */}
          <Sunburst />
        </section>
        <section>
          {/* <div className="envisable box"> */}
          {/* <h2>
              <EyeOutlined className="icon" />
              <span className="title"> 可视化和易于使用</span>
            </h2>
            <p>
              本平台具有直观的用户界面和易于使用的工具，以便客户可以轻松地执行算法评估并获得结果。此外，还可以通过图表和可视化工具向客户展示评估结果。
            </p>
          </div>
          <div className="freedom box">
            <h2>
              <BorderOuterOutlined className="icon" />
              <span className="title">可扩展性和灵活性</span>
            </h2>
            <p>
              本平台具有可扩展性和灵活性，以便客户可以根据自己的需求进行定制。例如，可以选择要评估的算法类型、数据集大小和评估指标等。
            </p>
          </div>
          <div className="freedom box">
            <h2>
              <SlidersOutlined className="icon" />

              <span className="title"> 自动化和高效性</span>
            </h2>
            <p>
              本感知分级算法评估平台可以自动执行算法评估，并提供快速、准确的结果。节省时间和精力，同时提高工作效率。
            </p>
          </div> */}
          <Library />
        </section>

        <section className="result">
          <h2>
            <RadarChartOutlined className="icon" />
            <span className="title">六维测试体系</span>
          </h2>
          <Radar
            result={[
              {
                basic: 70,
                adapt: 40,
                trust: 90,
                abstract: 50,
                collaAware: 80,
                selfLearn: 73
              },
              {
                basic: 87,
                adapt: 80,
                trust: 50,
                abstract: 70,
                collaAware: 42,
                selfLearn: 64
              }
            ]}
          />
          {/* <ReactEcharts
            ref={chartRef}
            option={options}
            style={{ width: "100%", height: "300px" }}
          /> */}
        </section>
      </main>
    </HomeWrapper>
  );
};

export default memo(Home);
