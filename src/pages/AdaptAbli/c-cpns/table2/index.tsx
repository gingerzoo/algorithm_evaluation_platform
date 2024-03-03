import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { Table2Wrapper } from "./style";
import { Button, Modal, Popover } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { IbasicRes, Iconditon, Iwork } from "@/type";
import { useAppDispatch, useAppSelector } from "@/store";

import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { getNote, sceneToNum, tranEntoCh } from "@/assets/data/local_data";
import MyCarousel from "@/components/carousel";
import Add_work from "@/components/add_work";
import {
  changeCheckListAction,
  changeGuideNewCondiAction,
  changeNavigateNewCondiAction,
  changeNeedGenDataAction,
  changeRemoteNewCondiAction,
  changeVoiceNewCondiAction,
  getAdaptResImgsAction,
  getImgAction
} from "../../store";
import { createOneWork } from "@/utils/getItem";
import { shallowEqual } from "react-redux";
import { use } from "echarts";
import My_drawer from "@/components/my_drawer";
import { click } from "@testing-library/user-event/dist/click";

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
  const {
    scene,
    adapt,
    needCenDataChange,
    newWork,
    picIndex,
    iniCheckList,
    imgUrls,
    basicResult,
    resImgs,
    overAll,
    basicStatus,
    adapt_run_status
  } = useAppSelector(
    (state) => ({
      scene: state.basicConfig.scene,
      adapt: state.adaptAbili,
      needCenDataChange: state.adaptAbili.needGenData,
      newWork: state.adaptAbili.newWorkObj,
      picIndex: state.adaptAbili.picIndex,
      iniCheckList: state.adaptAbili.checkList,
      imgUrls: state.adaptAbili.imgUrl,
      basicResult: state.basicEffect.population_score,
      resImgs: state.adaptAbili.resultImgs,
      overAll: state.adaptAbili.overAll,
      basicStatus: state.basicEffect.run_status,
      adapt_run_status: state.adaptAbili.run_status
    }),
    shallowEqual
  );
  const { workConditions } = props;

  //   console.log("workConditions", workConditions);

  /* 获得该页面的场景 */
  //   const pageScene = location.hash.split("/").slice(-1)[0];
  const sceneNum = sceneToNum[scene];
  //   console.log("pageScene", pageScene);

  /* 获得该场景的工况数据 */
  const adaptState = adapt[scene] as Iwork[];

  /* 获得该场景的运行结果 */
  const sceneResult = adapt[`${scene}Result`] as string[];
  //控制新建工况对话框开关状态
  const [modal2Open, setModal2Open] = useState(false);
  //控制抽屉组件开关的状态
  const [drawer1Open, setDraw1Open] = useState(false);

  //控制结果预览的抽屉组件开关的状态
  const [drawer2Open, setDraw2Open] = useState(false);

  const [workNum, setWorkNum] = useState(0);

  const adaptResult = adapt[`${scene}Result`] as string[];

  const adaptRes = adaptResult
    .filter((item, index) => item !== "")
    .map((item, index) => `在工况${index + 1}的环境下，正确率下降为${item}级`);

  const carouselTitle =
    scene == "voice"
      ? `音频试听- 工况${workNum + 1}- 音频${picIndex + 1}`
      : `图片预览- 工况${workNum + 1} - 图片${picIndex + 1}`;

  const resPic = `结果预览-工况${workNum + 1}`;

  const intenRef = useRef(intenArray);
  const weightRef = useRef(weightArray);
  const condiRef = useRef(condiArray);

  useEffect(() => {
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
      });
    });
  });

  useEffect(() => {
    // console.log("useEffect中发送了图片的网络请求");
    dispatch(getImgAction({ workIndex: workNum, pageScene: scene, sceneNum }));
  }, [scene]);
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
    const myCheckList = [...iniCheckList];
    myCheckList[sceneNum] = newCheckList;
    setCheckList(newCheckList);
    dispatch(changeCheckListAction(myCheckList));
    console.log("newCheckList", myCheckList);
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

    /* 改变后的权重数组 */
    // console.log("newSceneInten", newSceneInten);

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
    if (drawer1Open) {
      dispatch(
        getImgAction({ workIndex: workNum, pageScene: scene, sceneNum })
      );
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

    const myCheckList = [...iniCheckList];
    myCheckList[sceneNum] = newCheckList;

    setCheckList(newCheckList);
    dispatch(changeCheckListAction(myCheckList));
    setModal2Open(false);
    // dispatch(change)

    //push方法返回的是新数组的长度！！！！！！！！！！！
    //pop() 方法移除数组的最后一个元素，并返回该元素。

    const newWorks = [...adaptState];
    console.log("newwork", newWork);
    newWorks.push(newWork);
    if (sceneNum === 0) {
      dispatch(changeGuideNewCondiAction(newWorks));
    } else if (sceneNum === 1) {
      dispatch(changeNavigateNewCondiAction(newWorks));
    } else if (sceneNum === 2) {
      dispatch(changeRemoteNewCondiAction(newWorks));
    } else {
      dispatch(changeVoiceNewCondiAction(newWorks));
    }
    chooseDispatch(scene, newWorks);
    console.log("newworks____________", newWorks);
  }

  /* 点击图片预览按钮的处理函数 */
  function viewImage(workIndex: number) {
    if (drawer2Open) setDraw2Open(false);
    setDraw1Open((drawer1Open) => !drawer1Open);

    setWorkNum(workIndex);
  }
  //点击查看结果预览按钮的处理函数
  function showResPicHandle(workIndex: number) {
    if (drawer1Open) setDraw2Open(false);
    setWorkNum(workIndex);
    console.log("workIndex--------------", workIndex);
    setDraw2Open((drawer2Open) => !drawer2Open);
    const workk = [...workConditions].slice(workIndex, workIndex + 1);

    dispatch(getAdaptResImgsAction(workk));
    console.log("发送了结果图片的请求", workk);
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
                    // defaultChecked
                    checked={iniCheckList[sceneNum][workIndex] ?? "false"}
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
                {scene == "voice" ? "音频试听" : "图片预览"}
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
              (drawer1Open && workIndex != workNum)
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
              (drawer1Open && workIndex != workNum)
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
        {/* <td>
          <span> {workCondition.weight}</span>
        </td> */}
        <td className="note">{getNote[condition]}</td>
        {isFirst ? (
          <td rowSpan={condiLen} className="adaptRes">
            {sceneResult[workIndex] && (
              <span>
                {sceneResult[workIndex]}{" "}
                <a
                  className="showPic"
                  onClick={() => {
                    showResPicHandle(workIndex);
                  }}
                >
                  查看结果
                </a>
              </span>
            )}
          </td>
        ) : (
          ""
        )}
      </tr>
    );
  }

  /* 点击结果说明的泡泡按钮 */
  const [openPopover, setOpenPopover] = useState(false);
  const popoverClick = () => {
    setOpenPopover(false);
  };
  const popoverChangeHandle = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  return (
    <Table2Wrapper>
      <table className="table_v1 table_color">
        <tbody>
          <tr>
            <td rowSpan={0} style={{ width: "8.5vw" }}>
              可适应能力(自定义模型)
            </td>
            <td>说明</td>
            <td colSpan={4}>
              作用强度为0-5,结果等级:5级为80-100,4级别为60-80,3级为40-60,2级为20-40,1级为0-20
            </td>
          </tr>
          <tr>
            {/* <td rowSpan={tranEntoCh.length + 1}>预设工况I</td> */}
            <td></td>
            <td style={{ width: "11vw" }}>干扰名称</td>
            <td style={{ width: "9vw" }}>作用强度</td>
            {/* <td style={{ width: "7.5vw" }}>权重</td> */}
            <td>备注</td>
            <td style={{ width: "8vw" }}>等级</td>
          </tr>
          {adapt[scene] &&
            (adapt[scene] as Iwork[]).map((works, workIndex) => {
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
                  <button
                    // type="primary"
                    className="newCondi"
                    onClick={() => {
                      setModal2Open(true);
                    }}
                  >
                    新建工况
                  </button>
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
            <td className="overall">总体评价</td>
            <td colSpan={5} className="evaluation">
              {basicStatus === 0 && adapt_run_status === 0 ? (
                <Popover
                  content={overAll}
                  title="对比结果"
                  placement="topRight"
                  overlayStyle={{ maxWidth: "18vw", color: "white" }}
                >
                  <div>
                    {` 基础效能检测分数为为${basicResult},智能等级为${Math.floor(
                      basicResult / 20 + 1
                    )}${overAll}`}
                  </div>
                </Popover>
              ) : (
                <div>
                  {` 基础效能检测分数为为${basicResult},智能等级为${Math.floor(
                    basicResult / 20 + 1
                  )}`}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <My_drawer
        title={carouselTitle}
        drawerOpen={drawer1Open}
        sceneNum={sceneNum}
        imgUrls={imgUrls}
        onClose={() => {
          setDraw1Open(false);
        }}
        onLeave={() => {
          setDraw1Open(false);
        }}
      />
      <My_drawer
        title={resPic}
        drawerOpen={drawer2Open}
        sceneNum={sceneNum}
        imgUrls={resImgs}
        onClose={() => {
          setDraw2Open(false);
        }}
        onLeave={() => {
          setDraw2Open(false);
        }}
      />
    </Table2Wrapper>
  );
};

export default memo(MyTable2);
