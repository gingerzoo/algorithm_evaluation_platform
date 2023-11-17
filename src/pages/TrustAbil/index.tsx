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
          在计算机视觉领域,对抗攻击（adversarial
          attack）旨在通过向图片中添加人眼无法感知的噪音以欺骗诸如图像分类、目标识别等机器学习模型。如下图所示,输入原图像,图像分类器给出的结果为“是船的概率为68.8%”,而在给原图像加上一段噪音后,结果变成了“是自行车的概率为88.8%”，但对于人类来说，这两张图片几乎是一模一样的。常见对抗攻击方法：
          <div>
            1、Optim（optimization-based
            attacks）是通过对原始图像进行优化，生成一些新的图像来攻击模型。
            （基于优化的方法）
          </div>
          <div>
            2、Mim（Momentum Iterative
            Method）是一种基于梯度的迭代攻击方法，与FGSM的区别在于它使用了动量来提高攻击的效果。这种攻击方法生成的对抗样本也与原始图像看起来非常相似。（基于动量迭代的攻击方法）
          </div>
          <div>
            3、Bim（Basic Iterative
            Method）和Mim类似，是通过对原始图像进行迭代优化来生成对抗样本。与Mim不同的是，Bim对每一个迭代步骤都使用了小一点的epsilon，这会使得生成的图像会比Mim更加接近原始图像。（基于迭代的攻击方法）
          </div>
          <div>
            4、PGD（Projected Gradient
            Descent），它使用投影梯度下降法来进行攻击。PGD的攻击效果非常好，但需要更多的时间和计算资源。（基于投影梯度下降方法）
          </div>
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
