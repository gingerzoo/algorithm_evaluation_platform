import React, { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { HomeWrapper } from "./style";
import circle from "@/assets/images/circle.png";
import Radar from "@/components/radar";
import ReactEcharts from "echarts-for-react";
import EChartsReact from "echarts-for-react";

interface Iprops {
  children?: ReactNode;
}

const Home: FC<Iprops> = (props) => {
  const navigate = useNavigate();
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
        { name: "维度5", max: 100 }
      ],
      splitNumber: 4 // 设置每个维度轴线的分割段数为 4
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

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().setOption(options);
    }
  }, []);

  return (
    <HomeWrapper>
      <header>
        <div className="center">
          <div className="top">
            <h1>智能算法评估平台</h1>
            <h5 className="desc">
              提供基础效能、可依赖性、可适应性、协同感知和抽象感知等多维度测试
            </h5>
          </div>

          <div className="opeBar">
            <button onClick={useBtnClick}>立即使用</button>
            <button>技术文档 </button>
          </div>
        </div>
      </header>
      <main>
        <section className="freedom">
          <h2>全方位覆盖</h2>
          <img src={circle} />
        </section>
        <section>
          <div className="envisable box">
            <h2>可视化数据生成</h2>
            <p>
              提供图片、文本、音频、视频等丰富数据
              类型的可视化管理，支持便捷的数据导入导出、查看、分版本管理等完善的管理服务
            </p>
          </div>
          <div className="freedom box">
            <h2>高自由度定义工况</h2>
            <p>
              提供便捷的数据定义方案,丰富的工况数据模板及工具，以及智能化的数据清洗及加工服务,为AI开发提供高质量的训练数据
            </p>
          </div>
        </section>

        <section className="result">
          <h2>六维测试体系</h2>
          <Radar
            result={{
              basic: 70,
              abstract: 50,
              adapt: 40,
              trust: 60,
              collaAware: 80
            }}
          />
          {/* <ReactEcharts ref={chartRef} option={options} /> */}
        </section>
      </main>
    </HomeWrapper>
  );
};

export default memo(Home);
