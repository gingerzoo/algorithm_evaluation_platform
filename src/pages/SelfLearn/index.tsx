import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { SelfLearnWrap } from "./style";

interface Iprops {
  children?: ReactNode;
}

const SelfLearn: FC<Iprops> = (props) => {
  return (
    <SelfLearnWrap>
      <table className="table_v1">
        <tbody>
          <tr>
            <td rowSpan={0} style={{ width: "8.8vw" }}>
              自学习能力
            </td>
            <td style={{ width: "8.7vw" }}>说明</td>
            <td colSpan={4} className="describe">
              作用强度为0-10,结果等级:A级别为97%,B级别为92%,C级别为85%,D级别为70%,E级别为55%
            </td>
          </tr>
          <tr>
            <td rowSpan={3}>小样本学习</td>
            <td style={{ width: "10vw" }}>训练样本数</td>
            <td style={{ width: "10vw" }}>测试样本数</td>
            <td style={{ width: "9vw" }}>正确率</td>
            <td>备注</td>
          </tr>
          <tr>
            <td>10000</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>样本说明</td>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td rowSpan={3}>在线学习</td>
            <td colSpan={2}>测试样本数</td>
            <td colSpan={2}>正确率变化</td>
          </tr>
          <tr>
            <td colSpan={2}>1000</td>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td>样本说明</td>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td>总体分数</td>
            <td colSpan={4}></td>
          </tr>
        </tbody>
      </table>
    </SelfLearnWrap>
  );
};

export default memo(SelfLearn);
