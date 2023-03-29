import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { CooperWrap } from "./style";

interface Iprops {
  children?: ReactNode;
}

const CollaAware: FC<Iprops> = (props) => {
  return (
    <CooperWrap>
      <table className="table_v1 table_color">
        <tbody>
          <tr>
            <td rowSpan={0}>协同感知</td>
            <td>算法名称</td>
            <td colSpan={5}></td>
          </tr>
          <tr>
            <td rowSpan={4}>多波段融合(遥感)</td>
            <td>实验条件</td>
            <td>可见光</td>
            <td>红外</td>
            <td>雷达</td>
            <td>组合</td>
          </tr>
          <tr>
            <td>正确率</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
          </tr>
          <tr>
            <td>样本情况</td>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td>结果说明</td>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td rowSpan={4} className="muti-target">
              多口标融合(导引)
            </td>
            <td rowSpan={2}>实验情况</td>
            <td>目标总数</td>
            <td>引导总数</td>
            <td>验证轮次</td>
            <td>命中率</td>
          </tr>
          <tr>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
          </tr>
          <tr>
            <td>样本情况</td>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td>结果说明</td>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td>整体评价</td>
            <td colSpan={5}></td>
          </tr>
        </tbody>
      </table>
    </CooperWrap>
  );
};

export default memo(CollaAware);
