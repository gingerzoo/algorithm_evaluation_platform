import React, { Fragment, memo, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { ResultsWrap } from "./style";
import { useAppSelector } from "@/store";
import Radar from "@/components/radar";

import {
  basicResList,
  model_desribe,
  res_measurement
} from "@/assets/data/local_data";
import Model_score from "./c-cpns/modelScore";
import ModelDetail from "./c-cpns/modelDetail";
import classNames from "classnames";
import Pie from "@/components/pie";
import Bar from "@/components/bar";
import { Slider } from "antd";
import { IbasicRes } from "@/type";
import { SliderMarks } from "antd/es/slider";
import Line from "@/components/line";

interface Iprops {
  children?: ReactNode;
}

interface Iscore {
  [index: string]: number;
}

interface Ipie {
  value: number;
  name: string;
}

interface Iline {
  type: string;
  data: number[];
  name: string;
}

const Results: FC<Iprops> = (props) => {
  const {
    scene,
    sceneNum,
    curAlgo,
    checkList,
    abliRes,
    basic_result,
    adaptPop,
    trustPop,
    whiteScore,
    blackScore
  } = useAppSelector((state) => ({
    scene: state.basicConfig.scene,
    sceneNum: state.basicConfig.sceneNum,
    curAlgo: state.basicConfig.curAlgo,
    checkList: state.adaptAbili.checkList,
    abliRes: state.adaptAbili.runResult,
    basic_result: state.basicEffect,
    adaptPop: state.adaptAbili.populstion_score,
    trustPop: state.trustAbili.population_score,
    whiteScore: state.trustAbili.white,
    blackScore: state.trustAbili.black
  }));
  const { model_name } = curAlgo;

  const basicPop = basic_result.population_score;
  const basicRate = Math.floor(basicPop / 20 + 1);
  const adaptRate = Math.floor(adaptPop / 20 + 1);
  const trustRate = Math.floor(trustPop / 20 + 1);

  const trustScore = {
    white: whiteScore,
    black: blackScore
  };

  const curName = basicResList[sceneNum];
  const workName = checkList[sceneNum].map((item: boolean, index) => {
    if (item) return `工况${index + 1}`;
  }) as string[];

  let score_list: string[] = [];
  const color = ["#FCCA00", "#73C0DE", "#5470C6", "#EE6666"];

  const adaptAbli = abliRes.score_info?.map((item, index) => {
    score_list = Object.keys(item)
      .filter((score_name: string) => score_name.endsWith("score"))
      .slice(0, -1);
    const filteredObj: Iscore = {};
    console.log("name_list", score_list);
    score_list.forEach((name: string) => (filteredObj[name] = item[name]));
    return filteredObj;
  });
  const curResult = (basic_result[scene] as IbasicRes)["score"];
  //根据curName的长度定义一个初始化的slider
  const iniSlider = new Array(curName.length).fill(5);
  //当然要定义一个状态啦，不然怎么更新页面
  const [pie1Value, setPie1Value] = useState(curResult);
  //还有slider的个数未知
  const [slider, setSlider] = useState(iniSlider);

  const bar1_data = score_list.map((item, index) => {
    const curIndex = item;
    const curData: number[] = adaptAbli.map((item) => item[curIndex]);
    return {
      name: curName[index],
      data: curData,
      type: "bar"
    };
  });

  const pie1_data: Ipie[] = [];
  curName.forEach((item, index) => {
    pie1_data.push({ value: pie1Value[index], name: curName[index] });
  });

  const line1_data: Iline[] = [];
  Object.entries(trustScore).forEach((item) => {
    line1_data.push({ data: item[1], name: item[0], type: "bar" });
  });

  console.log("line_data", line1_data);

  const sliderChangeHandle = (value: number, index: number) => {
    console.log("value_________", value);
    console.log("index_________", index);
    let curPie = [...pie1Value];
    const curSlider = [...slider];
    curSlider[index] = value;
    const curAll = curSlider.reduce((pre, cur) => pre + cur);
    setSlider(curSlider);

    curPie = curPie.map((item, index) => item * (curSlider[index] / curAll));
    console.log("curPie_________________", curPie);
    setPie1Value(curPie);
  };

  const echarts = [
    <Pie key={0} data={pie1_data} />,
    <Bar key={1} workName={workName} value={bar1_data} />,
    <Line key={2} value={line1_data} category={curName} />,
    <Pie key={3} data={pie1_data} />,
    <Bar key={4} workName={workName} value={bar1_data} />,

    <Radar
      key={5}
      result={[
        {
          basic: 70,
          adapt: 40,
          trust: 90,
          abstract: 50,
          collaAware: 80,
          selfLearn: 73
        }
      ]}
    />
  ];

  return (
    <ResultsWrap>
      <section>
        <h3>模型 {model_name} 详情</h3>
        <p>
          <div className="item1 grid_item">
            <span>模型名称</span>
            <span>{curAlgo.model_name}</span>
          </div>
          <div className="item2 grid_item">
            <span>作者</span>
            <span>{curAlgo.author}</span>
          </div>
          <div className="item3 grid_item">
            <span>模型描述</span>
            <span>{curAlgo.key_word?.join("、")}</span>
          </div>
          <div className="item4 grid_item">
            <span>数据格式</span>
            <span>{curAlgo.dataType?.join("、")}</span>
          </div>
          <div className="item5 grid_item">
            <span>应用场景</span>
            <span>{scene}</span>
          </div>
          {/* <span className="item6"></span> */}
          <div className="pic">
            <img src="https://tech.openeglab.org.cn:8001/api/ImageAI/static/model_arch/RN50.png" />
          </div>
        </p>
      </section>
      <section>
        <div className="left">
          <h3>六维测评</h3>
          <div className="radar">
            <Radar
              result={[
                {
                  basic: 70,
                  adapt: 40,
                  trust: 90,
                  abstract: 50,
                  collaAware: 80,
                  selfLearn: 73
                }
              ]}
            />
          </div>
        </div>
        <div className="right">
          <h3>模型评分详情</h3>
          <div className="score_content">
            <Model_score name={res_measurement[0]} score={basicRate}>
              {` 在无干扰的理想情况下,智能体拥有${basicRate}级智能`}
            </Model_score>
            <Model_score name={res_measurement[1]} score={adaptRate}>
              {`加入实况中可能遇到的特情,智能体拥有${adaptRate}级智能`}
            </Model_score>
            <Model_score name={res_measurement[2]} score={trustRate}>
              对抗攻击,智能体可信赖能力表现为{trustRate}级智能
            </Model_score>
            <Model_score name={res_measurement[3]} score={2}>
              特情瞬息万变,智能体自学习能力表现为2级智能
            </Model_score>
            <Model_score name={res_measurement[4]} score={3}>
              多波段融合,智能体协同感知能力表现为3级智能
            </Model_score>
            <Model_score name={res_measurement[5]} score={3}>
              高级语义理解,智能体抽象感知能力表现为3级智能
            </Model_score>
            <Model_score name={res_measurement[6]} score={3}>
              模型总体性能评估,表现为3级智能
            </Model_score>
          </div>
        </div>
      </section>
      <section>
        {res_measurement.map((item, index) => (
          <div className={classNames("chart", `chart${index + 1}`)} key={item}>
            <ModelDetail
              model_index={index + 1}
              model_name={item}
              model_desribe={model_desribe[index]}
            >
              {echarts[index]}
            </ModelDetail>
          </div>
        ))}
        <div className="slider">
          {curName.map((item, index) => {
            return (
              <Fragment key={index}>
                <Slider
                  max={10}
                  style={{ backgroundColor: color[index] }}
                  included={false}
                  //   marks={marks}
                  defaultValue={5}
                  onAfterChange={(value) => sliderChangeHandle(value, index)}
                />
              </Fragment>
            );
          })}
        </div>
      </section>
    </ResultsWrap>
  );
};

export default memo(Results);
