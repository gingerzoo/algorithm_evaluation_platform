import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { Table2Wrapper } from "./style";
import { Button, Drawer, Modal, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Iconditon } from "@/type";
import { useAppDispatch, useAppSelector } from "@/store";

import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { getNote, tranEntoCh } from "@/assets/data/local_data";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import MyCarousel from "@/components/carousel";
import Add_work from "@/components/add_work";
import {
  changeCheckListAction,
  changeGuideNewCondiAction,
  changeImgUrlAction,
  changeNavigateNewCondiAction,
  changeNeedGenDataAction,
  changePageSceneAction,
  changeRemoteNewCondiAction,
  changeVoiceNewCondiAction,
  getImgAction,
  getWorkDefaultAction,
  Iwork
} from "../../store";
import { createOneWork } from "@/utils/getItem";
import { shallowEqual } from "react-redux";

interface Iprops {
  children?: ReactNode;
  workConditions: Iwork[];
}

//存放某一场景所有工况的强度的二维数组
const intenArray: number[][] = [];
//存放某一场景所有工况的权重的二维数组
const weightArray: number[][] = [];

//存放某一场景所有工况的干扰名称的二维数组
const condiArray: string[][] = [];

const MyTable2: FC<Iprops> = (props) => {
  const { scene, adapt, needCenDataChange, newWork, picIndex, imgUrl } =
    useAppSelector(
      (state) => ({
        scene: state.basicConfig.scene,
        adapt: state.adaptAbili,
        needCenDataChange: state.adaptAbili.needGenData,
        newWork: state.adaptAbili.newWorkObj,
        picIndex: state.adaptAbili.picIndex,
        imgUrl: state.adaptAbili.imgUrl
      }),
      shallowEqual
    );
  const { workConditions } = props;

  /* 获得该页面的场景 */
  const pageScene = location.hash.split("/").slice(-1)[0];
  //   console.log("pageScene", pageScene);

  /* 获得该场景的工况数据 */
  const adaptState = adapt[scene] as Iwork[];

  /* 获得该场景的运行结果 */
  const sceneResult = adapt[`${scene}Result`] as string[];
  //控制新建工况对话框开关状态
  const [modal2Open, setModal2Open] = useState(false);
  //控制抽屉组件开关的状态
  const [drawerOpen, setDrawOpen] = useState(false);
  //点击图片预览时所在工况号
  const [workNum, setWorkNum] = useState(0);

  /* 这里有什么办法优化吗，每次重新渲染组件都很重新定义这三个遍历这三个变量 */

  const carouselTitle =
    pageScene == "voice"
      ? `音频试听- 工况${workNum + 1}- 音频${picIndex + 1}`
      : `图片预览- 工况${workNum + 1} - 图片${picIndex + 1}`;

  const intenRef = useRef(intenArray);
  const weightRef = useRef(weightArray);
  const condiRef = useRef(condiArray);

  useEffect(() => {
    dispatch(getWorkDefaultAction());
    console.log("useEffect中的pagesecne", pageScene);
    dispatch(changePageSceneAction(pageScene));
  }, [pageScene]);

  useEffect(() => {
    //分别给存储intensity和weight的两个二维数组初始化初始化
    intenRef.current = [];
    weightRef.current = [];
    condiRef.current = [];

    adaptState?.map((work, workIndex) => {
      intenRef.current.push([]);
      weightRef.current.push([]);
      condiRef.current.push([]);
      Object.values(work).map((condition, condiIndex) => {
        condiRef.current[workIndex].push(Object.keys(work)[condiIndex]);
        intenRef.current[workIndex].push(condition.intensity);
        weightRef.current[workIndex].push(condition.weight);
        //   noteArray[workIndex].push(condition.note);
      });
    });
    // dispatch(getImgAction({ workIndex: workNum, picIndex }));
  });

  useEffect(() => {
    console.log("useEffect中发送了图片的网络请求");
    dispatch(getImgAction({ workIndex: workNum }));
  }, [workNum]);
  /* 某一场景所有工况的是否被勾选的状态 */
  const [checkList, setCheckList] = useState([true, true]);

  /*  这里用state不太好使用，因为新建工况中新添加的强度它没办法知道 */
  //   const [intenList, setIntenList] = useState(intenArray);
  //   const [weightList, setWeightList] = useState(weightArray);

  const dispatch = useAppDispatch();

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

  const checkChangeHandle = (e: CheckboxChangeEvent, workIndex: number) => {
    // console.log(`checked = ${e.target.checked}`);
    const newCheckList = [...checkList];
    newCheckList[workIndex] = e.target.checked;
    setCheckList(newCheckList);
    dispatch(changeCheckListAction(newCheckList));
    console.log(newCheckList);
  };

  /* 强度/权重值改变时的处理函数 */
  const intensityChange = (
    isAdd: boolean,
    workIndex: number,
    condiIndex: number,
    condition: string,
    nowInten: number
  ) => {
    const newAllwork: Iwork[] = [];
    /* 改变后的强度值 */
    const addNum = isAdd ? nowInten + 1 : nowInten - 1;

    /* 改变后的强度数组 */
    const newSceneInten = [...intenRef.current];

    newSceneInten[workIndex][condiIndex] = addNum;

    // setIntenList(newSceneInten);
    /* 改变后的权重数组 */
    console.log("newSceneInten", newSceneInten);

    if (!needCenDataChange) {
      dispatch(changeNeedGenDataAction(true));
    }
    condiRef.current.map((work, workIndex) => {
      const newWork: Iwork = {};
      createOneWork(
        work,
        newSceneInten[workIndex],
        weightRef.current[workIndex],
        newWork
      );
      newAllwork.push(newWork);
    });
    // console.log(newAllwork);
    chooseDispatch(scene, newAllwork);
    if (drawerOpen) {
      dispatch(getImgAction({ workIndex: workNum }));
      console.log("应该获得新图片，因为改变了强度");
    }
  };

  /* 点击新建工况按钮的处理函数 */
  function addNewWork() {
    if (!needCenDataChange) {
      dispatch(changeNeedGenDataAction(true));
    }
    const newCheckList = [...checkList];
    newCheckList.push(true);

    setCheckList(newCheckList);
    dispatch(changeCheckListAction(newCheckList));
    setModal2Open(false);
    // createOneWork(newCondition as string[], newIntensity, newWeight, new3Work);

    //push方法返回的是新数组的长度！！！！！！！！！！！
    //pop() 方法移除数组的最后一个元素，并返回该元素。
    //shift()删除数组的第一个元素，并返回该元素。
    const newWorks = [...adaptState];
    newWorks.push(newWork);
    chooseDispatch(scene, newWorks);
  }

  /* 点击图片预览按钮的处理函数 */
  function viewImage(workIndex: number) {
    setDrawOpen((drawerOpen) => !drawerOpen);
    // dispatch(getImgAction({ workIndex, picIndex }));
    setWorkNum(workIndex);
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
          <td rowSpan={condiLen} style={{ width: "9vw" }} className="title-pic">
            <div className="box-box">
              <div className="preWork">
                <span className="title">
                  {workIndex <= 1
                    ? `预设工况${workIndex + 1}`
                    : `自建工况${workIndex + 1}`}
                  <Checkbox
                    onChange={(e) => {
                      checkChangeHandle(e, workIndex);
                    }}
                    defaultChecked
                    value={workIndex}
                  />
                </span>
              </div>

              <Button
                type="primary"
                // size="small"
                className="viewPic"
                onClick={() => {
                  viewImage(workIndex);
                }}
              >
                {pageScene == "voice" ? "音频试听" : "图片预览"}
              </Button>
            </div>
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
              (drawerOpen && workIndex != workNum)
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
              (drawerOpen && workIndex != workNum)
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
        <td>{getNote[condition]}</td>
        {isFirst ? <td rowSpan={condiLen}>{sceneResult[workIndex]}</td> : ""}
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
            <td colSpan={6} className="add-work">
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
                    width={"30%"}
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
        title={carouselTitle}
        width={pageScene == "voice" ? "32vw" : "38vw"}
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
        <div className="drawer-content">
          <MyCarousel workNum={workNum} pageScene={pageScene} />
        </div>
      </Drawer>
    </Table2Wrapper>
  );
};

export default memo(MyTable2);
