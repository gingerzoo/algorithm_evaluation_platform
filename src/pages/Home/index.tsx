import React, { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { HomeWrapper } from "./style";
import Radar from "@/components/radar";

import {
  AlertOutlined,
  EyeOutlined,
  RadarChartOutlined
} from "@ant-design/icons";
import Sunburst from "@/components/sunburst";
import { useAppDispatch, useAppSelector } from "@/store";
import Library from "./c-cpns/library";
import { getWorkDefaultAction } from "../AdaptAbli/store";

import useCanLogin from "@/hooks/useCanLogin";
import { getAlogListAction } from "../BasicConfig/store";

interface Iprops {
  children?: ReactNode;
}

const Home: FC<Iprops> = (props) => {
  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const canIlogin = useCanLogin();

  function useBtnClick() {
    canIlogin(`/profile`);
    console.log("拿到模型列表");
    dispatch(getAlogListAction());
  }

  useEffect(() => {
    dispatch(getWorkDefaultAction());
    console.log("在首页拿默认工况");

    // getTest().then((res) => {
    //   console.log("测试", res);
    // });
  }, []);

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
