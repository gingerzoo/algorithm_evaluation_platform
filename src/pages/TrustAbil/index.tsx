import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { TrustWrap } from "./style";
import Attack_detail from "./c-cpns/attack_detail";
import attack_bg from "@/assets/images/attack_bg.png";
import Basic_result from "../BasicConfig/c-cpns/basic_result";
import { useAppDispatch, useAppSelector } from "@/store";
import { IbasicRes } from "@/type";
import { message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { getTrustEffectAction } from "./store";
// import attack from "@/assets/images/attack.png";
interface Iprops {
  children?: ReactNode;
}

const TrustAbil: FC<Iprops> = () => {
  const { sceneNum, trust_result, scene, run_status, isPending } =
    useAppSelector((state) => ({
      scene: state.basicConfig.scene,
      sceneNum: state.basicConfig.sceneNum,
      trust_result: state.trustAbili,
      run_status: state.trustAbili.run_status,
      isPending: state.trustAbili.isPending
    }));
  const curResult = trust_result[scene] as IbasicRes;
  const dispatch = useAppDispatch();
  return (
    <TrustWrap>
      <div className="top">
        <p className="describe">
          在计算机视觉领域,对抗攻击（adversarial
          attack）旨在通过向图片中添加人眼无法感知的噪音以欺骗诸如图像分类、目标识别等机器学习模型。如下图所示,输入原图像,图像分类器给出的结果为“是船的概率为68.8%”,而在给原图像加上一段噪音后,结果变成了“是自行车的概率为88.8%”，但对于人类来说，这两张图片几乎是一模一样的。
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
            dispatch(getTrustEffectAction()).then((res) => {
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
