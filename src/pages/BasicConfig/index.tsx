import React, { memo, useCallback, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { FC, ReactNode } from "react";
import { Input, Menu, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Picture_show from "@/components/picture_show";
import Algorithm_upload from "./c-cpns/algorithm_upload";
import Dataset_upload from "./c-cpns/dataset_upload";
import { changeStatusBeAction, getBasicEffectAction } from "../BasicWork/store";

import Order from "./c-cpns/order";
import { subs } from "@/assets/data/local_data";
import { ConfigWrap } from "./style";
import System_overview from "@/components/system_overview";
import App_cover from "@/components/app_cover";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeInputRunAction,
  changeNextPathAction,
  changeNowProcessAction,
  changeSceneAction,
  changeSceneNumAction,
  changeStatusCommAction,
  commitDataAction,
  getAlogListAction
} from "./store";

import Typewriter from "./c-cpns/typewriter";
import { getImgAction } from "../AdaptAbli/store";
import { getDatasetInfo } from "../Dataset/service";

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
    isPending,
    curModule
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
      //   isAsure: state.basicConfig.isAsure,
      curModule: state.basicConfig.currentModule,
      isPending: state.basicEffect.isPending
    }),
    shallowEqual
  );

  //派发函数
  const dispatch = useAppDispatch();
  //路由跳转函数
  const navigate = useNavigate();
  //全局信息提示(校验信息)
  const [messageApi, contextHolder] = message.useMessage();

  //转圈圈的图标
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  //场景选择的数据
  const items = subs.map((item) => ({
    key: item.link,
    label: item.title
  }));

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
      dispatch(changeStatusBeAction(-1));
      dispatch(changeStatusCommAction(-1));
    }
  }

  //选中场景选择按钮的处理函数
  function sceneClickHandle(key: string, domEvent: any) {
    const scene = key.slice(1);
    const sceneNum = Number(key.slice(0, 1));
    dispatch(changeStatusBeAction(-1));
    dispatch(changeStatusCommAction(-1));
    dispatch(changeSceneAction(scene));
    dispatch(changeSceneNumAction(sceneNum));
    domEvent.currentTarget.classList.add("ant-menu-item-selected");
  }

  //确认配置按钮处理函数
  function affirmBtnClick() {
    dispatch(changeStatusBeAction(-1));
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

  //下一步按钮点击处理函数
  function nextBtnClick() {
    const nextPage = `/profile/basicwork/${scene}`;
    dispatch(changeNextPathAction(nextPage));
    dispatch(changeNowProcessAction(["基础设置", "基础效能"]));

    navigate(`/profile/basicwork/${scene}`);
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
        <button className="affirm btn" onClick={affirmBtnClick}>
          <span>确认配置</span>
        </button>
        <button className="execute btn" onClick={runBasicBtnClick}>
          <span>执行基础效能测试</span>
        </button>
        <div className="spinning">
          <Spin spinning={isPending} size={"large"} />
        </div>
        <button
          className="next btn"
          onClick={nextBtnClick}
          disabled={run_status != 0}
        >
          <span>下一步</span>
        </button>
      </div>
      {isPending && <Typewriter />}
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
