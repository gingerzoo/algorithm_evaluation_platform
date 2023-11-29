import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { WorkWrap } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeNextPathAction,
  changeNowProcessAction
} from "../BasicConfig/store";
import { Button } from "antd";
import { message, Spin } from "antd";
import Table1 from "./c-cpns/table1";
import { basicResInfoList, basicResList } from "@/assets/data/local_data";
import { IbasicRes } from "./type";
import { getAlogListAction } from "../BasicConfig/store";
import { getSelfLearnRunAction, getSelfLearnResImgsAction } from "./store";
import { BASE_URL } from "src/services/config/index";

interface Iprops {
  children?: ReactNode;
}

const SelfLearn: FC<Iprops> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    scene,
    sceneNum,
    inputPlace,
    inputRun,
    nowProcess,
    basicResult,
    curModule,
    commit_status,
    isPending,
    dataset
  } = useAppSelector((state) => ({
    scene: state.basicConfig.scene,
    sceneNum: state.basicConfig.sceneNum,
    inputPlace: state.basicConfig.inputPlace,
    inputRun: state.basicConfig.inputRun,
    nowProcess: state.basicConfig.nowProcess,
    basicResult: state.selfLearn,
    curModule: state.basicConfig.currentModule,
    commit_status: state.basicConfig.commit_status,
    isPending: state.basicEffect.isPending,
    dataset: state.basicConfig.dataSet
  }));
  const { score, status } = basicResult["sl" + scene] as IbasicRes;
  console.log(score);
  const info = basicResult.run_info;
  console.log(info);
  const [test, setTest] = useState(info);
  const [docker, setDocker] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  function next() {
    const nextPath = `/profile/colawareness`;
    dispatch(changeNextPathAction(nextPath));
    navigate(nextPath);
    dispatch(
      changeNowProcessAction([
        "基础设置",
        "基础效能",
        "可适应能力评估",
        "可信赖能力评估",
        "自学习能力评估",
        "协同感知能力评估"
      ])
    );
  }
  const handleDownload = async () => {
    try {
      const value1 = sceneNum;
      const value2 = dataset;
      const url = `${BASE_URL}/download-image?value1=${value1}&value2=${value2}`;
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "default"
      });
      const urlNew = `${BASE_URL}/download-image?value1=${value1}&value2=${value2}`;
      const linknew = document.createElement("a");
      linknew.href = urlNew;
      linknew.click();
      console.log(response);
      // ...
    } catch (error) {
      console.error("下载图片时出错:", error);
    }
  };
  useEffect(() => {
    dispatch(getAlogListAction());
  }, [docker]);
  const success = (info: string) => {
    return messageApi.open({
      type: "success",
      content: info,
      duration: 3
    });
  };
  //校验失败的提示信息
  const failed = (info: string) => {
    return messageApi.open({
      type: "error",
      content: info,
      duration: 3
    });
  };
  const curResult = basicResList[sceneNum].map((item, index) => {
    let secondScore = 0;
    if (test === "selflearn") {
      secondScore = score[index + status.length / 2];
    }
    return {
      name: item,
      assess: basicResInfoList[sceneNum][index],
      score: score[index],
      result: status[index],
      second_score: secondScore
    };
  });
  console.log(curResult);
  //执行测试按钮处理函数
  function runSelfLearnBtnClick() {
    setTest("selflearn");
    console.log(test);
    dispatch(getSelfLearnRunAction()).then((res) => {
      if (getSelfLearnRunAction.fulfilled.match(res)) {
        console.log(res.payload);
        if (!res.payload.status) {
          success("执行成功");
          dispatch(getSelfLearnResImgsAction());
        } else {
          // failed(res.payload.info);
          failed("算法运行失败");
        }
      }
    });
  }
  function uploadFile(file: File): void {
    const formData = new FormData();
    formData.append("file", file);
    const url = `${BASE_URL}/upload-weight`;
    fetch(url, {
      method: "POST",
      body: formData
    })
      .then((response) => {
        console.log(response);
        {
          success("新的权重文件上传成功");
        }
        // 处理服务器的响应
      })
      .catch((error) => {
        // 处理错误
      });
  }
  function handleFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      uploadFile(file);
    }
  }
  function selectFile(): void {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pt"; // 限制只能选择.pt格式的文件
    input.addEventListener("change", handleFileSelect);
    input.click();
  }
  return (
    <WorkWrap>
      <br />
      {contextHolder}
      <div className="top">
        <button className="btn" onClick={handleDownload}>
          <span>点击下载数据集</span>
        </button>
        <button className="btn" onClick={selectFile}>
          <span>点击上传新的权重文件</span>
        </button>
        <button className="btn" onClick={runSelfLearnBtnClick}>
          <span>自学习能力测试</span>
        </button>
        <div className="spinning">
          <Spin spinning={isPending} size={"large"} />
        </div>
      </div>
      <Table1
        secIndex={curResult}
        population_result={status[status.length - 1]}
        population_score={score[score.length / 2 - 1]}
        population_score_second={score[score.length - 1]}
      />
      <div className="next">
        <Button onClick={next} type="primary" className="btn">
          进行协同感知能力评估
        </Button>
      </div>
    </WorkWrap>
  );
};

export default memo(SelfLearn);
