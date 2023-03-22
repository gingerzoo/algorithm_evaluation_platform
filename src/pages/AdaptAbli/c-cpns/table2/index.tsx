import React, { Fragment, memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { Table2Wrapper } from "./style";
import { Button, Drawer, Modal, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Iconditon } from "@/type";
import { useAppDispatch, useAppSelector } from "@/store";

import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { tranEntoCh } from "@/assets/data/local_data";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
// import {
//   changeWk1deformationAction,
//   changeWk1illuminationAction,
//   changeWk1noiseAction,
//   changeWk1occlusionAction,
//   changeWk2blurAction,
//   changeWk2cloudAction,
//   changeWk2illuminationAction
// } from "../../store/modules/guide";
import Add_work from "@/components/add_work";
import {
  changeGuideNewCondiAction,
  changeNavigateNewCondiAction,
  changeRemoteNewCondiAction,
  changeVoiceNewCondiAction,
  Iwork
} from "../../store";
import { createOneWork } from "@/utils/getItem";

interface Iprops {
  children?: ReactNode;
  workConditions: Iwork[];
}

interface Iaction {
  //   actionName: string;
  (action: string): ActionCreatorWithPayload<any>;
}

const MyTable2: FC<Iprops> = (props) => {
  const { scene, adapt, newIntensity, newWeight, newCondition } =
    useAppSelector((state) => ({
      scene: state.basicConfig.scene,
      adapt: state.adaptAbili,
      newIntensity: state.adaptAbili.intensityList,
      newWeight: state.adaptAbili.weightList,
      newCondition: state.adaptAbili.conditionList
    }));
  const { workConditions } = props;
  const pageScene = location.hash.split("/").pop();

  const adaptState = adapt[scene] as Iwork[];
  //控制新建工况对话框开关状态
  const [modal2Open, setModal2Open] = useState(false);
  //控制抽屉组件开关的状态
  const [drawerOpen, setDrawOpen] = useState(false);

  //点击图片预览时所在工况号
  const [workNum, setWorkNum] = useState(0);

  //存放某一场景所有工况的强度的二维数组
  const intenArray: number[][] = [];
  //存放某一场景所有工况的权重的二维数组
  const weightArray: number[][] = [];
  //存放某一场景所有工况的权重的二维数组
  const noteArray: string[][] = [];
  //存放某一场景所有工况的干扰名称的二维数组
  const condiArray: string[][] = [];

  //分别给存储intensity和weight的两个二维数组初始化初始化
  adaptState.map((work, workIndex) => {
    intenArray.push([]);
    weightArray.push([]);
    noteArray.push([]);
    condiArray.push([]);
    Object.values(work).map((condition, condiIndex) => {
      condiArray[workIndex].push(Object.keys(work)[condiIndex]);
      intenArray[workIndex].push(condition.intensity);
      weightArray[workIndex].push(condition.weight);
      noteArray[workIndex].push(condition.note);
    });
  });

  const [intenList, setIntenList] = useState(intenArray);

  const [weightList, setWeightList] = useState(weightArray);

  //   const [condiList, setCondiList] = useState(condiArray);

  const dispatch = useAppDispatch();

  const new3Work: Iwork = {};

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  function chooseDispatch(scene: string | undefined, newWorks: Iwork[]) {
    if (typeof scene == "string") {
      switch (scene) {
        case "guide":
          dispatch(changeGuideNewCondiAction(newWorks));
          break;
        case "navigate":
          dispatch(changeNavigateNewCondiAction(newWorks));
          break;
        case "remote":
          dispatch(changeRemoteNewCondiAction(newWorks));
          break;
        case "voice":
          dispatch(changeVoiceNewCondiAction(newWorks));
          break;
        default:
          break;
      }
    }
  }

  /* 强度/权重值改变时的处理函数 */
  const intensityChange = (
    isAdd: boolean,
    workIndex: number,
    condiIndex: number,
    condition: string,
    nowInten: number
  ) => {
    const newAllwork: Iwork[] = [];
    const addNum = isAdd ? nowInten + 1 : nowInten - 1;

    /* 改变后的干扰名称数组 */

    /* 改变后的强度数组 */
    const newSceneInten = [...intenArray];

    newSceneInten[workIndex][condiIndex] = addNum;
    setIntenList(newSceneInten);
    /* 改变后的权重数组 */
    condiArray.map((work, workIndex) => {
      const newWork: Iwork = {};
      createOneWork(
        work,
        intenArray[workIndex],
        weightArray[workIndex],
        newWork
      );
      newAllwork.push(newWork);
    });
    // console.log(newAllwork);
    chooseDispatch(scene, newAllwork);
  };

  /* 点击新建工况按钮的处理函数 */
  function addNewWork() {
    // if(newIntensity.includes())
    console.log(newIntensity);
    console.log(newWeight);
    setModal2Open(false);
    createOneWork(newCondition, newIntensity, newWeight, new3Work);

    //push方法返回的是新数组的长度！！！！！！！！！！！
    //pop() 方法移除数组的最后一个元素，并返回该元素。
    //shift()删除数组的第一个元素，并返回该元素。
    const newWork = [...adaptState];
    newWork.push(new3Work);
    chooseDispatch(scene, newWork);
  }

  /* 点击图片预览按钮的处理函数 */
  function viewImage(workIndex: number) {
    setDrawOpen(true);
    setWorkNum(workIndex + 1);
    console.log(workIndex + 1);
  }

  function createTr(
    workCondition: Iconditon,
    condition: string, //condition是英文名
    label: string, //label是中文名
    workIndex: number,
    condiIndex: number,
    isFirst: boolean,
    condiLen: number
  ) {
    return (
      <tr key={`${workIndex}-${condition}`}>
        {isFirst ? (
          <td rowSpan={condiLen} style={{ width: "9vw" }}>
            <span className="preWork">
              {" "}
              {workIndex <= 1
                ? `预设工况${workIndex + 1}`
                : `自建工况${workIndex + 1}`}
            </span>
            <Checkbox onChange={onChange} defaultChecked />
            <Button
              type="primary"
              size="small"
              className="viewPic"
              onClick={() => {
                viewImage(workIndex);
              }}
            >
              图片预览
            </Button>
          </td>
        ) : (
          ""
        )}

        <td>{label}</td>
        <td>
          <Button
            type="primary"
            icon={<MinusOutlined />}
            size="small"
            onClick={() => {
              intensityChange(
                false,
                workIndex,
                condiIndex,
                condition,
                workCondition.intensity
              );
            }}
            disabled={
              workCondition.intensity <= 0 ||
              (drawerOpen && workIndex + 1 != workNum)
            }
          />
          <span className={`intensity ${workIndex}${condition}`}>
            {workCondition.intensity}
          </span>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="small"
            disabled={
              workCondition.intensity >= 10 ||
              (drawerOpen && workIndex + 1 != workNum)
            }
            onClick={() => {
              intensityChange(
                true,
                workIndex,
                condiIndex,
                condition,
                workCondition.intensity
              );
            }}
          />
        </td>
        <td>
          {" "}
          <span> {workCondition.weight}</span>
        </td>
        <td>{workCondition.note}</td>
        {isFirst ? <td rowSpan={condiLen}>A</td> : ""}
      </tr>
    );
  }

  return (
    <Table2Wrapper>
      <table className="table_v1 table_color">
        <tbody>
          <tr>
            <td rowSpan={0} style={{ width: "8.5vw" }}>
              可适应能力
            </td>
            <td>说明</td>
            <td colSpan={5}>
              作用强度为0-10,结果等级:A级别为97%,B级别为92%,C级别为85%,D级别为70%,E级别为55%
            </td>
          </tr>
          <tr>
            {/* <td rowSpan={tranEntoCh.length + 1}>预设工况I</td> */}
            <td></td>
            <td>干扰名称</td>
            <td style={{ width: "9vw" }}>作用强度</td>
            <td style={{ width: "7.5vw" }}>权重</td>
            <td style={{ width: "21vw" }}>备注</td>
            <td style={{ width: "5.5vw" }}>等级</td>
          </tr>
          {workConditions &&
            workConditions.map((works, workIndex) => {
              const itemworkValue = Object.values(works);
              //   console.log("works", works);
              //   console.log("itemworkValue", itemworkValue);
              const itemKeys = Object.keys(works);
              //   console.log(itemKeys);

              return (
                <Fragment key={workIndex}>
                  {itemworkValue.map((item, condiIndex) => {
                    const condition = itemKeys[condiIndex];
                    const label = tranEntoCh[condition];
                    if (condiIndex == 0)
                      return (
                        <Fragment key={condition}>
                          {createTr(
                            item as any,
                            condition,
                            label,
                            workIndex,
                            condiIndex,
                            true,
                            itemKeys.length
                          )}
                        </Fragment>
                      );
                    else
                      return (
                        <Fragment key={condition}>
                          {createTr(
                            item as any,
                            condition,
                            label,
                            workIndex,
                            condiIndex,
                            false,
                            itemKeys.length
                          )}
                        </Fragment>
                      );
                  })}
                </Fragment>
              );
            })}

          <tr>
            <td colSpan={6}>
              {
                <>
                  <Button
                    type="primary"
                    className="newCondi"
                    onClick={() => {
                      setModal2Open(true);
                    }}
                  >
                    新建工况
                  </Button>
                  <Modal
                    title="新建工况"
                    centered
                    width={"40%"}
                    open={modal2Open}
                    onOk={() => addNewWork()}
                    onCancel={() => setModal2Open(false)}
                    okText="确认提交"
                    cancelText="取消"
                    className="myModal"
                  >
                    <Add_work />
                  </Modal>
                </>
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
      <Drawer
        title={`图片预览 - 工况${workNum}`}
        // placement={placn
        width={"38vw"}
        maskClosable={false}
        mask={false}
        open={drawerOpen}
        onClose={() => {
          setDrawOpen(false);
        }}
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setDrawOpen(false);
              }}
            >
              退出
            </Button>
          </Space>
        }
      >
        <p>工况{workNum}</p>
      </Drawer>
    </Table2Wrapper>
  );
};

export default memo(MyTable2);
