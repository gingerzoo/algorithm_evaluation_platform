import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { TrustWrap } from "./style";
import { Button } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EyeFilled
} from "@ant-design/icons";
import { attackWhite } from "@/assets/data/local_data";

interface Iprops {
  children?: ReactNode;
}

const TrustAbil: FC<Iprops> = () => {
  return (
    <TrustWrap>
      <table className="prepare table_v1">
        <tbody>
          <tr>
            <th colSpan={2}>攻击方法选择及配置</th>
          </tr>

          <tr>
            <td style={{ width: "250px" }}>攻击类型</td>
            <td style={{ width: "550px" }}>攻击方法</td>
          </tr>
          <tr>
            <td rowSpan={12}>
              <input name="Attack_WhiteBox" type="checkbox" value="" />
              基于白盒的攻击方法
            </td>
            <td>
              <input name="Attack_WhiteBox" type="checkbox" value="" />
              快速梯度方法（二范数）
              <a>参数配置</a>
            </td>
          </tr>
          {attackWhite.map((item, index) => {
            return (
              <tr key={item}>
                <td>
                  <input name="Attack_WhiteBox" type="checkbox" value="" />
                  {item}
                  <a>参数配置</a>
                </td>
              </tr>
            );
          })}
          <tr>
            <td rowSpan={2}>
              <input name="Attack_WhiteBox" type="checkbox" value="" />
              基于黑盒的攻击方法
            </td>
            <td>
              <input name="Attack_WhiteBox" type="checkbox" value="" />
              Decision-based Adversarial Attack (DBA攻击)
              <a>参数配置</a>
            </td>
          </tr>
          <tr>
            <td>
              <input name="Attack_WhiteBox" type="checkbox" value="" />
              Hop Skip Jump Attack (HS攻击)
              <a>参数配置</a>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="reliable table_v1">
        <tbody>
          <tr>
            <td rowSpan={0} style={{ width: "130px" }}>
              可信赖性
            </td>
            <td style={{ width: "100px" }}>说明</td>
            <td colSpan={4} style={{ width: "600px" }}>
              作用强度为0-10级
            </td>
          </tr>
          <tr>
            <td rowSpan={4}>干扰类别</td>
            <td style={{ width: "120px" }}>名称</td>
            <td style={{ width: "140px" }}>作用强度</td>
            <td style={{ width: "100px" }}>权重</td>
            <td>备注</td>
          </tr>
          <tr>
            <td>经典对抗</td>
            <td>5</td>
            <td>7</td>
            <td></td>
          </tr>
          <tr>
            <td>虚假目标</td>
            <td>6</td>
            <td>9</td>
            <td></td>
          </tr>
          <tr>
            <td>特殊装涂</td>
            <td>7</td>
            <td>5</td>
            <td></td>
          </tr>
          <tr>
            <td>总体分数</td>
            <td colSpan={4} className="score">
              A
            </td>
          </tr>
        </tbody>
      </table>
    </TrustWrap>
  );
};

export default memo(TrustAbil);
