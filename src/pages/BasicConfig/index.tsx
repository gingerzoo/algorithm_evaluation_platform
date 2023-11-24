import React, { memo, useCallback, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import type { FC, ReactNode } from "react";
import { Input, message, Spin } from "antd";
import Picture_show from "@/components/picture_show";
import Algorithm_upload from "./c-cpns/algorithm_upload";
import Dataset_upload from "./c-cpns/dataset_upload";
import {
  changeBasicStatusAction,
  getBasicEffectAction
} from "../BasicWork/store";

import Order from "./c-cpns/order";
import { sceneToNum, subs } from "@/assets/data/local_data";
import { ConfigWrap } from "./style";
import System_overview from "@/components/system_overview";
import App_cover from "@/components/app_cover";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeInputRunAction,
  changeSceneAction,
  changeSceneNumAction,
  changeStatusCommAction,
  commitDataAction,
  getAlogListAction
} from "./store";

import Typewriter from "./c-cpns/typewriter";
import Basic_result from "./c-cpns/basic_result";
import { getResultPic } from "../BasicWork/service";
import { IbasicRes } from "@/type";

interface Iprops {
  children?: ReactNode;
}

const BasicConfig: FC<Iprops> = () => {
  //拿到redux中管理的状态
  const {
    scene,
    inputPlace,
    inputRun,
    commit_status,
    run_status,
    isPending,
    curModule,
    basic_result
  } = useAppSelector(
    (state) => ({
      scene: state.basicConfig.scene,
      inputPlace: state.basicConfig.inputPlace,
      inputRun: state.basicConfig.inputRun,
      dataset_type: state.basicConfig.dataSet,
      commit_status: state.basicConfig.commit_status,
      commit_info: state.basicConfig.commit_info,
      run_status: state.basicEffect.run_status,
      //   isAsure: state.basicConfig.isAsure,
      curModule: state.basicConfig.currentModule,
      isPending: state.basicEffect.isPending,
      basic_result: state.basicEffect
    }),
    shallowEqual
  );

  const curResult = basic_result[scene] as IbasicRes;

  const sceneNum = sceneToNum[scene];

  //派发函数
  const dispatch = useAppDispatch();

  //全局信息提示(校验信息)
  const [messageApi, contextHolder] = message.useMessage();

  //是否点击了查看系统概况的按钮
  const [isSystem, setIsSystem] = useState(false);
  //是否点击了浏览数据集样本的按钮
  const [isPicture, setIsPicture] = useState(false);

  const [docker, setDocker] = useState(0);

  const changeDocker = useCallback(() => {
    setDocker((docker) => docker + 1);
    console.log("nowState", docker + 1);
  }, [docker]);

  //   useEffect(() => {
  //     dispatch(getImgAction({ workIndex: 1 ,}));
  //   }, [scene]);

  useEffect(() => {
    console.log("在页面里拿模型列表");
    dispatch(getAlogListAction());
  }, [docker]);

  //校验成功的提示信息
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

  //点击查看系统按钮的执行函数
  const systemCover = useCallback(() => {
    setIsSystem(!isSystem);
    // console.log(isSystem, "系统概况");
  }, [isSystem]);

  //点击浏览数据集样本按钮的执行函数
  const pictureCover = useCallback(() => {
    setIsPicture(!isPicture);
    // console.log("查看图片");
  }, [isPicture]);

  //   input输入框输入内容时的处理函数
  function inputChangeHandle(e: React.FormEvent<HTMLInputElement>) {
    console.log("input框发生改变");
    dispatch(changeInputRunAction(e.currentTarget.value));
  }

  //   input输入框失去焦点时的处理函数
  function inputBlurHandle(e: React.FormEvent<HTMLInputElement>) {
    console.log("input框失去焦点");
    if (e.currentTarget.value) {
      dispatch(changeBasicStatusAction(-1));
      dispatch(changeStatusCommAction(-1));
    }
  }

  //选中场景选择按钮的处理函数
  function sceneClickHandle(key: string, domEvent: any) {
    const scene = key.slice(1);
    const sceneNum = Number(key.slice(0, 1));
    dispatch(changeBasicStatusAction(-1));
    dispatch(changeStatusCommAction(-1));
    dispatch(changeSceneAction(scene));
    dispatch(changeSceneNumAction(sceneNum));
    domEvent.currentTarget.classList.add("ant-menu-item-selected");
  }

  //确认配置按钮处理函数
  function affirmBtnClick() {
    dispatch(changeBasicStatusAction(-1));
    dispatch(changeStatusCommAction(-1));
    messageApi.destroy();
    if (curModule) {
      dispatch(commitDataAction()).then((res) => {
        //类型谓词
        if (commitDataAction.fulfilled.match(res)) {
          if (!res.payload.isAsure) success("配置成功");
          else failed(res.payload.info);
        }
      });
    } else {
      failed("请加载完算法模型后再进行此步骤");
    }
  }

  //执行测试按钮处理函数
  function runBasicBtnClick() {
    messageApi.destroy();
    if (!commit_status) {
      dispatch(getBasicEffectAction()).then((res) => {
        if (getBasicEffectAction.fulfilled.match(res)) {
          console.log(res.payload);
          if (!res.payload.status) {
            success("执行成功");
          } else {
            // failed(res.payload.info);
            failed("算法运行失败");
          }
        }
      });
    } else {
      failed("请确认配置");
    }
  }

  return (
    <ConfigWrap
      isSystem={isSystem}
      isPicture={isPicture}
      //   isPending={isPending}
      run_status={run_status}
    >
      {contextHolder}
      <div className="top">
        <Algorithm_upload
          commandClickHandle={systemCover}
          changeState={changeDocker}
        />
        {/* <Docker_upload commandClickHandle={systemCover} /> */}
        <Dataset_upload commandClickHandle={pictureCover} />
      </div>
      <div className="confi">
        <label htmlFor="commandInput">
          <Order title="运行命令" isCommand={true}>
            <Input
              type="text"
              placeholder={inputPlace}
              // value={inputRun}
              value={inputRun}
              onChange={(e) => {
                inputChangeHandle(e);
              }}
              onBlur={(e) => {
                inputBlurHandle(e);
              }}
              id="commandInput"
            />
          </Order>
        </label>
      </div>
      <div className="oper">
        <button className="affirm btn" onClick={affirmBtnClick}>
          <span>确认配置</span>
        </button>
        <button className="execute btn" onClick={runBasicBtnClick}>
          <span>执行基础效能测试</span>
        </button>
        <div className="spinning">
          <Spin spinning={isPending} size={"large"} />
        </div>
      </div>
      {isPending && <Typewriter />}
      {run_status == 0 && (
        <Basic_result
          sceneNum={sceneNum}
          curResult={curResult}
          title="基础效能"
          nextPath={`/profile/basicwork`}
        />
      )}
      <div className="cover system">
        <App_cover btnClickHandle={systemCover} width={600}>
          <System_overview />
        </App_cover>
      </div>
      <div className="picture cover">
        <App_cover btnClickHandle={pictureCover} width={850}>
          <Picture_show />
        </App_cover>
      </div>
    </ConfigWrap>
  );
};

export default memo(BasicConfig);
