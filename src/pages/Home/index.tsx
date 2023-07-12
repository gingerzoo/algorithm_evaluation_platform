import React, { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { HomeWrapper } from "./style";
import Radar from "@/components/radar";
import EChartsReact from "echarts-for-react";

import {
  AlertOutlined,
  EyeOutlined,
  RadarChartOutlined
} from "@ant-design/icons";
import Sunburst from "@/components/sunburst";
import { useAppDispatch } from "@/store";
import Library from "./c-cpns/library";
import { getWorkDefaultAction } from "../AdaptAbli/store";
interface Iprops {
  children?: ReactNode;
}

const Home: FC<Iprops> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //   const chartRef = useRef<EChartsReact>(null);

  function useBtnClick() {
    navigate(`/profile`);
  }

  useEffect(() => {
    dispatch(getWorkDefaultAction());
    console.log("在首页拿默认工况");
  }, []);

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

            <a href="http://10.2.12.63:8080/guidance_info/label_format.pdf">
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
            <span className="title">多任务覆盖</span>
          </h2>
          <Sunburst />
        </section>
        <section>
          <div className="box">
            <h2>
              <EyeOutlined className="icon" />
              <span className="title"> 支撑文件库</span>
            </h2>
            <Library />
          </div>
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
        </section>
      </main>
    </HomeWrapper>
  );
};

export default memo(Home);
