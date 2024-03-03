import { changeCurAlgoAction, Ialgo } from "@/pages/BasicConfig/store";
import { getAllWorkResult, IallRes, IsingleRes } from "@/pages/Results/service";
import { IrootState } from "@/store";
import { failedMessage } from "@/utils/message";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHistotyList, getModelHistoryList, IhistoryList } from "../services";

// type ImodelInfo={
//     author:string;
//     dataType:string[];
//     description:string;
//     key_word:string[]
// }
type Ihome = {
  user_name: string;
  can_login: boolean;
  remember: boolean;
  password: string;
  all_res: IallRes;
  allHistory: IhistoryList;
  //   modelInfo:ImodelInfo
};

const initialState: Ihome = {
  user_name: "luxiazhao",
  can_login: false,
  remember: true,
  password: "",
  all_res: {
    basic_effectiveness: {
      scoreList: [[]],
      rateScore: 0,
      class: 0,
      overall: ""
    },
    adaptablity: {
      scoreList: [[]],
      rateScore: 0,
      class: 0,
      overall: ""
    },
    dependability: {
      scoreList: [[]],
      rateScore: 0,
      class: 0,
      overall: ""
    },
    multiband: {
      scoreList: [[]],
      rateScore: 0,
      class: 0,
      overall: ""
    },
    abstract: {
      scoreList: [[]],
      rateScore: 0,
      class: 0,
      overall: ""
    },
    selflearn: {
      scoreList: [[]],
      rateScore: 0,
      class: 0,
      overall: ""
    },
    status: -1
  },
  allHistory: {
    status: -1,
    allResult: [
      "1111",
      "22222",
      "333333333",
      "44444444444",
      "555555555555555555555",
      "666666666666666"
    ]
  }
  //   modelInfo:{
  //     author:
  //   }
};

export const getAllWorkResAction = createAsyncThunk<
  void,
  void,
  {
    state: IrootState;
  }
>("getAllResult", async (par, { dispatch }) => {
  try {
    console.log("发送获得所有结果的请求!!!!!!!!");
    const res = await getAllWorkResult();
    // console.log("结果返回的图片", res);
    const sssList = [
      "basic_effectiveness",
      "adaptablity",
      "dependability",
      "abstract",
      "selflearn",
      " multiband"
    ];
    console.log("所有结果!!!!!!!!", res);
    if (res.status !== 0) {
      failedMessage("所有请求获取失败！！！！@@@");
    } else {
      for (const [key, value] of Object.entries(res)) {
        if (typeof value === "number") {
          continue;
        } else {
          if ("scoreList" in value) {
            if (value.scoreList.length > 0) {
              console.log("开始处理数据乘以100", key, value);
              value.scoreList = value.scoreList.map((item) => {
                return item.map((score) => Number((100 * score).toFixed(2)));
              });
            }
          }
        }
      }
      console.log("修改后的总结果", res);
      dispatch(changeAllResultAction(res));
    }
  } catch (err) {
    failedMessage("getAllWorkResult网络请求发生错误");
  }
});

export const getHistoryListAction = createAsyncThunk<
  void,
  void,
  {
    state: IrootState;
  }
>("getAllResult", async (par, { dispatch }) => {
  try {
    const res = await getHistotyList();
    // console.log("结果返回的图片", res);
    // console.log("所有历史结果!!!!!!!!", res);
    if (res.status !== 0) {
      failedMessage("历史结果列表获取失败");
    } else {
      dispatch(changeHistoryListAction(res));
    }
  } catch (err) {
    failedMessage(" getHistotyList网络请求发生错误");
    console.log("getHistotyList网络请求发生错误", err);
  }
});

export const getModelHistoryListAction = createAsyncThunk<
  void,
  string,
  {
    state: IrootState;
  }
>("getModelHistoryList", async (par, { dispatch }) => {
  try {
    const res = await getModelHistoryList(par);
    // console.log("结果返回的图片", res);
    console.log("所有历史结果!!!!!!!!", res);
    const curAlgo: any = {};

    if (res.status !== 0) {
      failedMessage("历史结果获取失败");
    } else {
      for (const [key, value] of Object.entries(res)) {
        if (typeof value === "number") {
          if (key === "scene") {
            curAlgo[key] = value;
          } else {
            continue;
          }
        } else if (typeof value === "string") {
          curAlgo[key] = value;
        } else {
          if ("scoreList" in value) {
            if (value.scoreList.length > 0) {
              console.log("开始处理数据乘以100", key, value);
              value.scoreList = value.scoreList.map((item) => {
                return item.map((score) => Number((100 * score).toFixed(2)));
              });
            }
          } else {
            curAlgo[key] = value;
          }
        }
      }

      curAlgo["default_cmd"] = ".....";
      console.log("修改后的历史总结果", res);
      console.log("修改后的历史模型数据", curAlgo);
      dispatch(changeAllResultAction(res));
      dispatch(changeCurAlgoAction(curAlgo));
    }
  } catch (err) {
    failedMessage("getModelHistoryList网络请求发生错误");
    console.log("getModelHistoryList网络请求发生错误", err);
  }
});

const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    changeUserNameAction(state, { payload }) {
      state.user_name = payload;
    },
    changeCanLoginAction(state, { payload }) {
      state.can_login = payload;
    },
    changePasswordAction(state, { payload }) {
      state.password = payload;
    },
    changeRememberAction(state, { payload }) {
      state.remember = payload;
    },
    changeAllResultAction(state, { payload }) {
      state.all_res = payload;
    },
    changeHistoryListAction(state, { payload }) {
      state.allHistory = payload;
    }
  }
});

export const {
  changeCanLoginAction,
  changeUserNameAction,
  changePasswordAction,
  changeRememberAction,
  changeAllResultAction,
  changeHistoryListAction
} = homeSlice.actions;

export default homeSlice.reducer;
