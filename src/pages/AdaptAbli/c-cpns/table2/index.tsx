import React, { Fragment, memo } from "react";
import type { FC, ReactNode } from "react";
import { Table2Wrapper } from "./style";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { workingconditions } from "@/type";
import { useAppSelector } from "@/store";

interface Iconditons {
  condition: workingconditions;
  intensity: number;
  weight: number;
  label: string;
}

interface Iprops {
  children?: ReactNode;
  workConditions: Iconditons[][];
}

const MyTable2: FC<Iprops> = (props) => {
  const { scene } = useAppSelector((state) => ({
    scene: state.basicConfig.scene
  }));
  const { workConditions } = props;
  function createTr(
    workCondition: Iconditons,
    index: number,
    isFirst: boolean,
    condiLen: number
  ) {
    return (
      <tr key={`${index}-${workCondition.condition}`}>
        {isFirst ? (
          <td rowSpan={condiLen} style={{ width: "110px" }}>
            预设工况{index}
          </td>
        ) : (
          ""
        )}

        <td>{workCondition.label}</td>
        <td>
          <Button type="primary" icon={<MinusOutlined />} size="small" />
          <span className="intensity"> {workCondition.intensity}</span>
          <Button type="primary" icon={<PlusOutlined />} size="small" />
        </td>
        <td>{workCondition.weight}</td>
        <td>{`工况${index}-${workCondition.condition}`}</td>
        {isFirst ? <td rowSpan={condiLen}>A</td> : ""}
      </tr>
    );
  }

  return (
    <Table2Wrapper>
      <table className="table_v1 table_color">
        <tbody>
          <tr>
            <td rowSpan={0} style={{ width: "110px" }}>
              可始应能力
            </td>
            <td>说明</td>
            <td colSpan={5}>
              作用强度为0-10,结果等级:A级别为97%,B级别为92%,C级别为85%,D级别为70%,E级别为55%
            </td>
          </tr>
          <tr>
            {/* <td rowSpan={workCondition1.length + 1}>预设工况I</td> */}
            <td></td>
            <td style={{ width: "120px" }}>干扰名称</td>
            <td style={{ width: "120px" }}>作用强度</td>
            <td style={{ width: "70px" }}>权重</td>
            <td>备注</td>
            <td style={{ width: "70px" }}>等级</td>
          </tr>
          {workConditions.map((scene, sceneIndex) => {
            const sceneLen = scene.length;
            return (
              <Fragment key={sceneIndex}>
                {scene.map((item, itemIndex) => {
                  if (itemIndex == 0)
                    return (
                      <Fragment key={item.condition}>
                        {createTr(item, sceneIndex + 1, true, sceneLen)}
                      </Fragment>
                    );
                  else
                    return (
                      <Fragment key={item.condition}>
                        {createTr(item, sceneIndex + 1, false, sceneLen)}
                      </Fragment>
                    );
                })}
              </Fragment>
            );
          })}

          <tr>
            <td colSpan={6}>
              {
                <Button
                  type="primary"
                  className="newCondi"
                  onClick={() => {
                    if (scene == "voice") {
                      console.log("hi");
                    }
                  }}
                >
                  新建工况
                </Button>
              }
            </td>
          </tr>
          <tr>
            <td>总体评价</td>
            <td colSpan={5} className="evaluation">
              基础效能(检测正确率)为95%,在I级环境下,正确率下降到94%,二级环境下正确率下降到90%
            </td>
          </tr>
        </tbody>
      </table>
    </Table2Wrapper>
  );
};

export default memo(MyTable2);
