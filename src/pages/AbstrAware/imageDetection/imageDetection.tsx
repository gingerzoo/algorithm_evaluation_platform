import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, message } from "antd";
import Abstract_image from "@/assets/images/abstract_sensing_image.jpeg";
import { Detection } from "./style";
import Basic_result from "../../BasicConfig/c-cpns/basic_result";
import { IbasicRes } from "@/type";

interface IParameters {
  flag: number;
}

function ImageDetection() {
  const [imageData, setImageData] = useState<string>("");
  const [selectedFlag, setSelectedFlag] = useState<number>(-1);
  const [parameters, setParameters] = useState<IParameters>({
    flag: -1
  });
  const [isPending, setisPending] = useState<boolean>(false);
  const [curResult, setcuresult] = useState<IbasicRes>({
    score: [0, 0, 0, 0],
    status: [0, 0, 0, 0]
  });
  const [status, setstatus] = useState<number>(-1);
  useEffect(() => {
    axios
      .post("http://10.2.12.63:5500/getAbstractdetection", parameters)
      .then((response) => {
        const score = [
          response.data.score.f1_score,
          response.data.score.map_score,
          response.data.score.mar_score,
          response.data.score.population_score
        ].map((item) => parseFloat((item * 100).toFixed(1)));
        setcuresult({
          score,
          status: [
            response.data.score.f1_result,
            response.data.score.map_result,
            response.data.score.mar_result,
            response.data.score.population_result
          ]
        });
        setisPending(false);
      })
      .catch((error) => {
        console.error(error);
        setisPending(false);
        if (parameters.flag !== -1) {
          message.error("网络错误！");
        }
      });
  }, [parameters]);

  const handleSubmit = (flag: number) => {
    setParameters({ flag });
    setisPending(true);
  };

  const getImageSource = (status: number) => {
    if (status === 0) {
      return `data:image/png;base64,${imageData}`;
    } else {
      return Abstract_image;
    }
  };

  const handleClick = () => {
    // console.log("点击了按钮");
    if (parameters.flag === 0 || parameters.flag === 1) {
      parameters.flag += 2; // 加上2
      axios
        .post("http://10.2.12.63:5500/getAbstractdetection", parameters)
        .then((response) => {
          setstatus(0);
          setImageData(response.data.score);
          parameters.flag -= 2;
        })
        .catch((error) => {
          console.error(error);
          // 处理错误
        });
    }
  };

  return (
    <Detection
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }}
      >
        <div>
          <label className="space">测试场景: </label>
          <select
            value={`${selectedFlag}`}
            onChange={(e) => {
              const flag = parseInt(e.target.value, 10);
              setSelectedFlag(flag);
            }}
          >
            <option value="-1" disabled>
              --请选择--
            </option>
            <option value="1">最大价值部位</option>
            <option value="0">最大价值目标</option>
          </select>
        </div>
        <button className="btn" onClick={() => handleSubmit(selectedFlag)}>
          检测
        </button>
        <Spin spinning={isPending} size="large" />
        <button className="btn" onClick={handleClick}>
          查看图片
        </button>
      </div>
      <div className="empty-div"></div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div style={{ width: "50%" }}>
          <img
            src={getImageSource(status)}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <Basic_result
          sceneNum={2}
          curResult={curResult}
          title="抽象感知"
          nextPath={`/profile/selflearning`}
        />
      </div>
    </Detection>
  );
}

export default ImageDetection;
