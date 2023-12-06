import { getAllWorkResult, IallRes, IsingleRes } from "@/pages/Results/service";
import { IrootState } from "@/store";
import { failedMessage } from "@/utils/message";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Ihome = {
  user_name: string;
  can_login: boolean;
  remember: boolean;
  password: string;
  all_res: IallRes;
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
  }
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
    console.log("所有结果!!!!!!!!", res);
    if (res.status !== 0) {
      failedMessage("所有请求获取失败");
    } else {
      for (const [key, value] of Object.entries(res)) {
        if (typeof value === "number") {
          continue;
        } else {
          if (value.scoreList.length > 0) {
            console.log("开始处理数据乘以100", key, value);
            value.scoreList = value.scoreList.map((item) => {
              return item.map((score) => Number((100 * score).toFixed(2)));
            });
          }
        }
      }
      console.log("修改后的总结果", res);
      dispatch(changeAllResultAction(res));
    }
  } catch (err) {
    failedMessage("网络请求发生错误");
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
    }
  }
});

export const {
  changeCanLoginAction,
  changeUserNameAction,
  changePasswordAction,
  changeRememberAction,
  changeAllResultAction
} = homeSlice.actions;

export default homeSlice.reducer;
