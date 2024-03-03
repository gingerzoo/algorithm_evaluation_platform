import { useAppSelector } from "@/store";
import {
  basicAllResList,
  basicResList,
  sceneToNum
} from "@/assets/data/local_data";
type Idata = {
  value: number[];
  name: string;
};

type Iindicator = {
  name: string;
  max: number;
};
export default function useCalcWorkNum() {
  const {
    checkList,
    sceneNum,
    isNoiceModel,
    basic_run_status,
    adapt_compareRes,
    noice_compareRes,
    all_res,
    adapt_status
  } = useAppSelector((state) => ({
    checkList: state.adaptAbili.checkList,
    sceneNum: state.basicConfig.sceneNum,
    isNoiceModel: state.noiseModel.isCheckedFlag,
    basic_run_status: state.basicEffect.run_status,
    adapt_compareRes: state.adaptAbili.compareRes,
    noice_compareRes: state.noiseModel.noice_compareRes,
    all_res: state.home.all_res,
    adapt_status: state.adaptAbili.runResult.status
  }));

  //   console.log("checkList", checkList);
  const resName: string[] = [];
  let data: Idata[] = [];
  let indicator: Iindicator[] = [];
  const resList = basicAllResList;
  const compareList = isNoiceModel ? noice_compareRes : adapt_compareRes;
  if (!isNoiceModel) {
    if (adapt_status == 0) {
      checkList[sceneNum].forEach((item, index) => {
        if (item) {
          resName.push(`工况${index + 1}`);
        }
      });
    }
  } else {
    resName.push("噪声模型");
    // if (basic_run_status === 0) {
    //   resName.push("基础效能");
    // }
  }
  if (all_res.basic_effectiveness.scoreList.length != 0) {
    resName.push("基础效能");
  }
  data = compareList?.map((item, index) => ({
    value: item,
    name: resName[index]
  }));

  indicator = resList[sceneNum].map((item) => ({
    name: item,
    // value: result[item.en],
    max: 100
  }));

  console.log("结果展示的data", data);
  console.log("结果展示的indicator", indicator);

  console.log("结果展示的工况", resName);

  return {
    data,
    indicator,
    workName: resName
  };
}
