import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { TrustWrap } from "./style";
import { Button } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EyeFilled
} from "@ant-design/icons";

interface Iprops {
  children?: ReactNode;
}

const TrustAbil: FC<Iprops> = () => {
  return (
    <TrustWrap>
      <table className="prepare table_v1">
        <tbody>
          <tr>
            <td style={{ width: "130px" }}>经典对抗</td>
            <td style={{ width: "300px" }}>/workspace/sample1</td>
            <td style={{ width: "200px" }}>
              <CheckCircleFilled style={{ color: "#A7C875" }} />
              <span className="text"> 已配置</span>
              <EyeFilled />
            </td>
            <td rowSpan={3}>
              <Button type="primary" className="start">
                开始测试
              </Button>
            </td>
          </tr>
          <tr>
            <td>虚假目标</td>
            <td>/workspace/sample2</td>
            <td>
              <CloseCircleFilled style={{ color: "#FF0000" }} />{" "}
              <span className="text"> 未配置</span>
              <EyeFilled />
            </td>
          </tr>
          <tr>
            <td>特殊装涂</td>
            <td>/workspace/sample3</td>
            <td>
              <CheckCircleFilled style={{ color: "#A7C875" }} />
              <span className="text"> 已配置</span>
              <EyeFilled />
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
