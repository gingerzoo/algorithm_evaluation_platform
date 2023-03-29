import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { AbstractWrap } from "./style";

interface Iprops {
  children?: ReactNode;
}

const AbstrAware: FC<Iprops> = (props) => {
  return (
    <AbstractWrap>
      <table className="table_color table_v1">
        <tbody>
          <tr>
            {/* style={{ width: "10.1vw" }} */}
            <td rowSpan={0}>抽象感知能力</td>
            {/* style={{ width: "13.8vw" }} */}
            <td>算法名称</td>
          </tr>
          {/* 重点部位检测定位 */}
          <tr>
            <td rowSpan={4}>重点部位检测定位</td>
            <td rowSpan={2}>实验情况</td>
            <td>输入尺寸</td>
            <td>目标位置</td>
            <td>命中位置</td>
            <td>误差</td>
          </tr>
          <tr>
            <td>30</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>样本情况</td>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td>结果说明</td>
            <td colSpan={4}></td>
          </tr>
          {/* 高价值定位 */}
          <tr>
            <td rowSpan={4} style={{ backgroundColor: "#F2F2F2" }}>
              高价值定位
            </td>
            <td rowSpan={2}>实验情况</td>
            <td>目标总数</td>
            <td>理想位置</td>
            <td>目标位置</td>
            <td> 误差</td>
          </tr>
          <tr>
            <td>30</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>样本情况</td>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td>结果说明</td>
            <td colSpan={4}></td>
          </tr>
          {/* 敌我区分 */}
          <tr>
            <td rowSpan={5}>敌我区分</td>
            <td rowSpan={2}>目标情况</td>
            <td colSpan={2}>敌方目标数</td>
            <td colSpan={2}>己方目标数</td>
          </tr>
          <tr>
            <td colSpan={2}> 30</td>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td rowSpan={2}>识别结果</td>
            <td colSpan={2}>正确命中数</td>
            <td colSpan={2}>误命中数</td>
          </tr>
          <tr>
            <td colSpan={2}> 30</td>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td>评价</td>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td>整体评价</td>
            <td colSpan={5}></td>
          </tr>
        </tbody>
      </table>
    </AbstractWrap>
  );
};

export default memo(AbstrAware);
