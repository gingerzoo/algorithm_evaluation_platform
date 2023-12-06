import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { ResultsWrap } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import Radar, { Iradar } from "@/components/radar";

import {
  basicResList,
  model_desribe,
  res_EnName,
  res_measurement
} from "@/assets/data/local_data";
import Model_score from "./c-cpns/modelScore";
import ModelDetail from "./c-cpns/modelDetail";
import classNames from "classnames";
import Pie from "@/components/pie";
import Bar from "@/components/bar";
import { Slider } from "antd";
import { IbasicRes } from "@/type";
import Line from "@/components/line";
import useCalcWorkNum from "@/hooks/useCalcWorkNum";
import { getAllWorkResAction } from "../Home/store";
import { IsingleRes } from "./service";
import Radar_v2 from "@/components/radar_v2";

interface Iprops {
  children?: ReactNode;
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

interface Itrust {
  白盒?: number[];
  黑盒?: number[];
  基础效能?: number[];
}

const Results: FC<Iprops> = (props) => {
  const { scene, sceneNum, curAlgo, origin_all_res } = useAppSelector(
    (state) => ({
      scene: state.basicConfig.scene,
      sceneNum: state.basicConfig.sceneNum,
      curAlgo: state.basicConfig.curAlgo,
      origin_all_res: state.home.all_res
    })
  );

  const {
    basic_effectiveness,
    adaptablity,
    dependability,
    multiband,
    abstract,
    selflearn
  } = origin_all_res;
  const { model_name } = curAlgo;

  const isBasicRun: boolean =
    origin_all_res.basic_effectiveness.scoreList?.length > 0;
  const color = ["#FCCA00", "#73C0DE", "#5470C6", "#EE6666"];

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("发送获取总数据的请求！");
    dispatch(getAllWorkResAction());
  }, []);

  /* 六维测评结果 */
  /* 拿出rate */
  const all_rate = res_EnName.map(
    (item) => (origin_all_res[item] as IsingleRes).class
  );
  console.log("all_rate", all_rate);
  /* 拿出rateScore */
  const all_rateScore = res_EnName.map((item) =>
    Number(((origin_all_res[item] as IsingleRes).rateScore * 100).toFixed(2))
  );
  console.log("all_rateScore", all_rateScore);
  /* 拿出over_all */
  const all_comment = res_EnName.map(
    (item) => (origin_all_res[item] as IsingleRes).overall
  );
  console.log("all_comment", all_comment);

  /*分模块结果 */
  /* 拿出各个模块的评语 */
  //   const module_comment=res_EnName.map(
  //     (item) => (origin_all_res[item] as IsingleRes).
  //   );
  //* 拿到 */
  const curName = basicResList[sceneNum];
  /* 基础效能数据 */
  const basicScoreList = basic_effectiveness.scoreList?.[0];
  const basic_data: Ipie[] = [];
  curName.forEach((item, index) => {
    basic_data.push({
      /* 这里要小心，取不取最后的总体分数 */
      value: basicScoreList?.slice(0, -1)[index],
      name: curName[index]
    });
  });

  /* 可适应能力数据 */
  const { workName, indicator } = useCalcWorkNum();

  const adapt_data = adaptablity.scoreList
    ?.concat(basic_effectiveness.scoreList)
    .map((item, index) => {
      return {
        value: item,
        name: workName[index]
      };
    });

  /* 可信赖能力 */
  const trustScore = {
    白盒: dependability.scoreList?.[0],
    黑盒: dependability.scoreList?.[1],
    基础效能: basic_effectiveness.scoreList?.[0]
  };

  const trust_data: Iline[] = [];
  Object.entries(trustScore).forEach(([key, value]) => {
    if (value) {
      trust_data.push({ data: value, name: key, type: "bar" });
    }
  });

  /* 多波段协同能力 */
  const multiBand_data: Ipie[] = [];
  curName.forEach((item, index) => {
    multiBand_data.push({
      /* 这里要小心，取不取最后的总体分数 */
      value: multiband.scoreList?.[0]?.slice(0, -1)[index],
      name: curName[index]
    });
  });

  /* 抽象感知能力 */
  const abstract_data: Ipie[] = [];
  curName.forEach((item, index) => {
    abstract_data.push({
      /* 这里要小心，取不取最后的总体分数 */
      value: abstract.scoreList?.[0]?.[index],
      name: curName[index]
    });
  });

  /* 自学习能力 */
  const selfLearn_data = [
    {
      type: "bar",
      data: selflearn.scoreList?.[0],
      name: "自学习能力"
    }
  ];
  if (isBasicRun) {
    selfLearn_data.push({
      type: "bar",
      data: basic_effectiveness.scoreList?.[0],
      name: "基础效能"
    });
  }

  const echarts = [
    <Pie key={0} data={basic_data} />,
    <Radar_v2
      key={1}
      indicator={indicator}
      data={adapt_data}
      isAll_res={true}
    />,
    <Line key={2} value={trust_data} category={curName} />,
    <Pie key={3} data={multiBand_data} />,
    <Pie key={4} data={abstract_data} />,
    <Bar key={5} workName={curName} value={selfLearn_data} />

    // <Radar
    //   key={5}
    //   result={[
    //     {
    //       basic_effectiveness: all_rateScore[0],
    //       adaptablity: all_rateScore[1],
    //       dependability: all_rateScore[2],
    //       multiband: all_rateScore[3],
    //       abstract: all_rateScore[4],
    //       selflearn: all_rateScore[5]
    //     }
    //   ]}
    // />
  ];
  /* 滑块控制 */
  //根据curName的长度定义一个初始化的slider
  const iniSlider = new Array(curName.length).fill(5);
  //当然要定义一个状态啦，不然怎么更新页面
  const [pie1Value, setPie1Value] = useState(basicScoreList);
  //还有slider的个数未知
  const [slider, setSlider] = useState(iniSlider);
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
                  basic_effectiveness: all_rateScore[0],
                  adaptablity: all_rateScore[1],
                  dependability: all_rateScore[2],
                  multiband: all_rateScore[3],
                  abstract: all_rateScore[4],
                  selflearn: all_rateScore[5]
                }
              ]}
            />
          </div>
        </div>
        <div className="right">
          <h3>模型评分详情</h3>
          <div className="score_content">
            <Model_score name={res_measurement[0]} score={all_rate[0]}>
              {` 在无干扰的理想情况下,智能体拥有${all_rate[0]}级智能`}
            </Model_score>
            <Model_score name={res_measurement[1]} score={all_rate[1]}>
              {`加入实况中可能遇到的特情,智能体拥有${all_rate[1]}级智能`}
            </Model_score>
            <Model_score name={res_measurement[2]} score={all_rate[2]}>
              {`对抗攻击,智能体可信赖能力表现为${all_rate[2]}级智能`}
            </Model_score>
            <Model_score name={res_measurement[3]} score={all_rate[3]}>
              {` 多波段融合,智能体协同感知能力表现为${all_rate[3]}级智能`}
            </Model_score>
            <Model_score name={res_measurement[4]} score={all_rate[4]}>
              {` 高级语义理解,智能体抽象感知能力表现为${all_rate[4]}级智能`}
            </Model_score>
            <Model_score name={res_measurement[5]} score={all_rate[5]}>
              {`特情瞬息万变,智能体自学习能力表现为${all_rate[5]}级智能`}
            </Model_score>

            {/*
            <Model_score name={res_measurement[6]} score={3}>
              模型总体性能评估,表现为3级智能
            </Model_score> */}
          </div>
        </div>
      </section>
      <section>
        {res_measurement.map((item, index) => (
          <div className={classNames("chart", `chart${index + 1}`)} key={item}>
            <ModelDetail
              model_index={index + 1}
              model_name={item}
              model_desribe={all_comment[index]}
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
