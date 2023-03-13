import React, { memo, useCallback, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { ConfigWrap } from "./style";
import { Input, InputRef, Menu, message } from "antd";

import Order from "./c-cpns/order";
import { subs } from "@/assets/data/local_data";

import System_overview from "@/components/system_overview";
import App_cover from "@/components/app_cover";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeInputPlaceAction,
  changeInputRunAction,
  changeIsAsureAction,
  changeNextPathAction,
  changeNowProcessAction,
  changeSceneAction,
  changeSceneNumAction,
  commitDataAction
} from "./store";
import { useNavigate } from "react-router-dom";
import Picture_show from "@/components/picture_show";
import Docker_upload from "./c-cpns/docker_upload";
import Dataset_upload from "./c-cpns/dataset_upload";
import { getBasicEffectAction } from "../BasicWork/store";
import { shallowEqual } from "react-redux";

interface Iprops {
  children?: ReactNode;
}

const BasicConfig: FC<Iprops> = () => {
  //拿到redux中管理的状态
  const {
    scene,
    inputPlace,
    inputRun,
    sceneNum,
    commit_status,
    run_status,
    isAsure
  } = useAppSelector(
    (state) => ({
      scene: state.basicConfig.scene,
      sceneNum: state.basicConfig.sceneNum,
      inputPlace: state.basicConfig.inputPlace,
      inputRun: state.basicConfig.inputRun,
      dataset_type: state.basicConfig.dataSet,
      commit_status: state.basicConfig.commit_status,
      commit_info: state.basicConfig.commit_info,
      run_status: state.basicEffect.run_status,
      isAsure: state.basicConfig.isAsure
    }),
    shallowEqual
  );
  //派发函数
  const dispatch = useAppDispatch();
  //路由跳转函数
  const navigate = useNavigate();
  //全局信息提示(校验信息)
  const [messageApi, contextHolder] = message.useMessage();

  //场景选择的数据
  const items = subs.map((item) => ({
    key: item.link,
    label: item.title
  }));

  //是否点击了查看系统概况的按钮
  const [isSystem, setIsSystem] = useState(false);
  //是否点击了浏览数据集样本的按钮
  const [isPicture, setIsPicture] = useState(false);

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

  //   input输入框失去焦点时的处理函数
  function inputClickHandle(e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.value) {
      dispatch(changeInputRunAction(e.currentTarget.value));
      dispatch(changeInputPlaceAction(e.currentTarget.value));
    }
  }

  //选中场景选择按钮的处理函数
  function sceneClickHandle(key: string, domEvent: any) {
    console.log("有人选我！");
    console.log(key);
    const scene = key.slice(1);
    const sceneNum = Number(key.slice(0, 1));
    // setScenaria(scene);
    dispatch(changeSceneAction(scene));
    dispatch(changeSceneNumAction(sceneNum));
    domEvent.currentTarget.classList.add("ant-menu-item-selected");
  }

  //确认配置按钮处理函数
  function affirmBtnClick() {
    messageApi.destroy();
    dispatch(changeIsAsureAction(true));

    dispatch(commitDataAction()).then((res) => {
      //类型谓词
      if (commitDataAction.fulfilled.match(res)) {
        if (!res.payload.isAsure) success("配置成功");
        else failed(res.payload.info);
      }
    });
  }

  //执行测试按钮处理函数
  function runBasicBtnClick() {
    messageApi.destroy();
    dispatch(getBasicEffectAction()).then((res) => {
      if (isAsure) {
        if (getBasicEffectAction.fulfilled.match(res)) {
          console.log(res.payload);
          if (!res.payload.status) {
            success("执行成功");
          } else {
            failed(res.payload.info);
          }
        }
      } else {
        failed("请确认配置");
      }
    });
  }

  //下一步按钮点击处理函数
  function nextBtnClick() {
    messageApi.destroy();
    if (!isAsure) {
      failed("请确认配置");
    } else if (commit_status) {
      console.log(commit_status);
      failed("模型配置错误");
    } else if (run_status) {
      failed("算法运行错误");
    } else {
      const nextPage = `/basicwork/${scene}`;
      dispatch(changeNextPathAction(nextPage));
      dispatch(changeNowProcessAction(["基础设置", "基础效能"]));

      navigate(`/basicwork/${scene}`);
    }
  }

  return (
    <ConfigWrap isSystem={isSystem} isPicture={isPicture}>
      {contextHolder}
      <div className="top">
        <Docker_upload commandClickHandle={systemCover} />
        <Dataset_upload commandClickHandle={pictureCover} />
      </div>
      <div className="confi">
        <Order title="运行命令" isCommand={true}>
          <Input
            type="text"
            placeholder={inputPlace}
            // value={inputRun}
            value={inputRun}
            onChange={(e) => {
              inputClickHandle(e);
            }}
          />
        </Order>

        <Order title="场景选择" isSecene={true}>
          <Menu
            mode="horizontal"
            items={items}
            selectedKeys={[`${sceneNum}${scene}`]}
            onSelect={({ key, domEvent }) => {
              sceneClickHandle(key, domEvent);
            }}
          />
        </Order>
      </div>
      <div className="oper">
        <div className="affirm btn" onClick={affirmBtnClick}>
          <span>确认配置</span>
        </div>
        <div className="execute btn" onClick={runBasicBtnClick}>
          <span>执行基础效能测试</span>
        </div>
        <div className="next btn" onClick={nextBtnClick}>
          <span>下一步</span>
        </div>
      </div>
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
