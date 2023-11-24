import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { TrustWrap } from "./style";
import Attack_detail from "./c-cpns/attack_detail";
import attack_bg from "@/assets/images/attack_bg.png";
import Basic_result from "../BasicConfig/c-cpns/basic_result";
import { useAppDispatch, useAppSelector } from "@/store";
import { IbasicRes } from "@/type";
import { message, Spin } from "antd";
import { getTrustEffectAction } from "./store";
import { trustDocument } from "@/assets/data/local_data";

interface Iprops {
  children?: ReactNode;
}

const TrustAbil: FC<Iprops> = () => {
  const {
    sceneNum,
    trust_result,
    scene,
    run_status,
    isPending,
    whiteNames,
    blackNames
  } = useAppSelector((state) => ({
    scene: state.basicConfig.scene,
    sceneNum: state.basicConfig.sceneNum,
    trust_result: state.trustAbili,
    run_status: state.trustAbili.run_status,
    isPending: state.trustAbili.isPending,
    whiteNames: state.trustAbili.whiteNames,
    blackNames: state.trustAbili.blackNames
  }));
  const curResult = trust_result[scene] as IbasicRes;
  const dispatch = useAppDispatch();
  return (
    <TrustWrap>
      <div className="top">
        <p className="describe">
          {trustDocument.map((item, index) => {
            return <span key={index}>{item}</span>;
          })}
        </p>
        <div className="pic">
          <img src={attack_bg} />
        </div>
      </div>
      <Attack_detail />

      <div className="exec">
        <button
          className="btn"
          onClick={() => {
            if (!whiteNames.length && !blackNames.length) {
              message.error({
                content: "请选择至少一个攻击对抗方法",
                duration: 2
              });
            } else {
              dispatch(getTrustEffectAction()).then((res) => {
                console.log("可信赖能力的接口调用成功并返回结果", res);
                if (getTrustEffectAction.fulfilled.match(res)) {
                  if (!res.payload.status) {
                    message.success({
                      content: "可信赖性测试成功",
                      duration: 2
                    });
                  } else {
                    // failed(res.payload.info);
                    message.error({
                      content: "可信赖性测试失败",
                      duration: 2
                    });
                  }
                }
              });
            }
          }}
        >
          <span>执行测试</span>
        </button>

        <Spin spinning={isPending} size="large" />
      </div>
      {run_status == 0 && (
        <Basic_result
          sceneNum={sceneNum}
          curResult={curResult}
          title="可信赖能力"
          nextPath={`/profile/selflearning`}
        />
      )}
    </TrustWrap>
  );
};

export default memo(TrustAbil);
