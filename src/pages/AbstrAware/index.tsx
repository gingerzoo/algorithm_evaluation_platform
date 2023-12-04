import React from "react";
import { AbstractWrap } from "./style";
import ImageDetection from "./imageDetection/imageDetection";
import { memo } from "react";

const AbstrAware: React.FC = () => {
  return (
    <AbstractWrap>
      <div className="top">
        <p className="describe">
          抽象感知任务旨在开展对算法的抽象感知能力的研究。主要包含两个层面的抽象感知任务：最大价值部位探测与最大价值目标探测，通过选择最大价值部分探测或者最大价值目标探测任务，可以对算法的抽象感知能力进行测试，以反映其性能。
        </p>
        <p className="describe">
          抽象感知能力指测试算法对图像中潜在的、深层次信息的抽象与感知的能力。最大价值目标反应了算法对场景中最优探测目标的感知能力，最大价值部位反应了算法对场景中最优探测部位的感知能力。
        </p>
        <p className="describe">
          抽象感知的优点之一是提供了更加丰富，更加深层次的目标价值信息。不同的抽象感知任务可以捕捉到图像中不同的价值特征，例如最大价值目标与最大价值部位。通过获取这些价值信息指标可以更好地判断算法对不同测试场景泛化能力以及适应性。
        </p>
      </div>
      <ImageDetection />
    </AbstractWrap>
  );
};
export default memo(AbstrAware);
