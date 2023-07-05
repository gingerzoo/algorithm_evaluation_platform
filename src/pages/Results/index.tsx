import React, { Fragment, memo, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { ResultsWrap } from "./style";
import { useAppSelector } from "@/store";
import Radar from "@/components/radar";

import { basicResList, res_measurement } from "@/assets/data/local_data";
import Model_score from "./c-cpns/modelScore";
import ModelDetail from "./c-cpns/modelDetail";
import classNames from "classnames";
import Pie from "@/components/pie";
import Bar from "@/components/bar";
import { Slider } from "antd";
import { IbasicRes } from "@/type";
import { SliderMarks } from "antd/es/slider";

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

const Results: FC<Iprops> = (props) => {
  const { scene, sceneNum, curAlgo, checkList, abliRes, basic_result } =
    useAppSelector((state) => ({
      scene: state.basicConfig.scene,
      sceneNum: state.basicConfig.sceneNum,
      curAlgo: state.basicConfig.curAlgo,
      checkList: state.adaptAbili.checkList,
      abliRes: state.adaptAbili.runResult,
      basic_result: state.basicEffect
    }));
  const { model_name, author, key_word, dataType } = curAlgo;

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
  const [pieValue, setPieValue] = useState(curResult);
  //还有slider的个数未知
  const [slider, setSlider] = useState(iniSlider);

  const bar_data = score_list.map((item, index) => {
    const curIndex = item;
    const curData: number[] = adaptAbli.map((item) => item[curIndex] * 100);
    return {
      name: curName[index],
      data: curData,
      type: "bar"
    };
  });

  const pie_data: Ipie[] = [];
  curName.forEach((item, index) => {
    pie_data.push({ value: pieValue[index] * 100, name: curName[index] });
  });

  const sliderChangeHandle = (value: number, index: number) => {
    console.log("value_________", value);
    console.log("index_________", index);
    let curPie = [...pieValue];
    const curSlider = [...slider];
    curSlider[index] = value;
    const curAll = curSlider.reduce((pre, cur) => pre + cur);
    setSlider(curSlider);

    curPie = curPie.map((item, index) => item * (curSlider[index] / curAll));
    console.log("curPie_________________", curPie);
    setPieValue(curPie);
  };

  const echarts = [
    <Pie key={0} data={pie_data} />,
    <Bar key={1} workName={workName} value={bar_data} />,
    <Radar
      key={2}
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
    />,
    <Pie key={3} data={pie_data} />,
    <Bar key={4} workName={workName} value={bar_data} />,

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
            <Model_score name={res_measurement[0]} score={4}>
              在50000张测试图片上达到了69.76%的top-1分类准确率。
            </Model_score>
            <Model_score name={res_measurement[1]} score={2}>
              在50000张测试图片上达到了69.76%的top-1分类准确率。
            </Model_score>
            <Model_score name={res_measurement[2]} score={4}>
              在50000张测试图片上达到了69.76%的top-1分类准确率。
            </Model_score>
            <Model_score name={res_measurement[3]} score={3.5}>
              在50000张测试图片上达到了69.76%的top-1分类准确率。
            </Model_score>
            <Model_score name={res_measurement[4]} score={3.5}>
              在50000张测试图片上达到了69.76%的top-1分类准确率。
            </Model_score>
            <Model_score name={res_measurement[5]} score={4}>
              在50000张测试图片上达到了69.76%的top-1分类准确率。
            </Model_score>
          </div>
        </div>
      </section>
      <section>
        {res_measurement.map((item, index) => (
          <div className={classNames("chart", `chart${index + 1}`)} key={item}>
            <ModelDetail model_index={index + 1} model_name={item}>
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
