import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import navigateAdaptReducer from "./modules/navigate";
import remoteAdaptReducer from "./modules/remote";
import voiceAdaptReducer from "./modules/voice";
import guideAdaptReducer from "./modules/guide";
import { getWorkCondition, getWorkDefault } from "../services";
import { workingconditions } from "@/type";
import { getNote } from "@/assets/data/local_data";

export interface Iwork {
  [index: string]: {
    // label: string;
    // note: string;
    intensity: number;
    weight: number;
    note: string;
  };
}

//这是干啥的？？？
type Icondition = {
  [index: string]: string[];
};
export interface Iprop {
  //   work: "image" | "voice";
  [index: string]: Iwork[] | string[] | number[] | Icondition | boolean;
  guide: Iwork[];
  navigate: Iwork[];
  remote: Iwork[];
  voice: Iwork[];
  workCondition: Icondition;
  conditionList: string[];
  intensityList: number[];
  weightList: number[];
  genIsPending: boolean;
  testIsPending: boolean;
}

export const getWorkCondiAction = createAsyncThunk(
  "workCondition",
  (par, { dispatch }) => {
    getWorkCondition().then((res) => {
      dispatch(changeWorkConditionAction(res));
    });
  }
);

export const getWorkDefaultAction = createAsyncThunk(
  "workCondition",
  (par, { dispatch }) => {
    getWorkDefault().then((res) => {
      dispatch(changeGuideNewCondiAction(res["0"]));
      dispatch(changeNavigateNewCondiAction(res["1"]));
      dispatch(changeRemoteNewCondiAction(res["2"]));
      dispatch(changeVoiceNewCondiAction(res["3"]));
    });
  }
);

const initialState: Iprop = {
  guide: [
    {
      occlusion: {
        note: getNote["occlusion"],
        intensity: 1,
        weight: 1
      },
      illumination: {
        intensity: 2,
        note: getNote["illumination"],
        weight: 1
      },
      deformation: {
        intensity: 3,
        note: getNote["deformation"],
        weight: 1
      },
      noise: {
        intensity: 4,
        note: getNote["noise"],
        weight: 1
      }
    },
    {
      cloud: {
        intensity: 6,
        note: getNote["cloud"],
        weight: 1
      },
      illumination: {
        intensity: 8,
        note: getNote["illumination"],
        weight: 1
      },

      blur: {
        note: getNote["blur"],
        intensity: 3,
        weight: 1
      }
    }
  ],
  navigate: [
    {
      occlusion: {
        intensity: 0,
        weight: 0,
        note: ""
      },
      illumination: {
        intensity: 0,
        weight: 0,
        note: ""
      },
      deformation: {
        intensity: 0,
        note: "",
        weight: 0
      },
      noise: {
        intensity: 0,
        note: "",
        weight: 0
      }
    },
    {
      cloud: {
        intensity: 0,
        note: "",
        weight: 0
      },
      illumination: {
        intensity: 0,
        note: "",
        weight: 0
      },

      blur: {
        note: "",
        intensity: 0,

        weight: 0
      }
    }
  ],
  remote: [
    {
      occlusion: {
        intensity: 0,
        weight: 0,
        note: ""
      },
      illumination: {
        intensity: 0,
        weight: 0,
        note: ""
      },
      deformation: {
        intensity: 0,
        note: "",
        weight: 0
      },
      noise: {
        intensity: 0,
        note: "",
        weight: 0
      }
    },

    {
      cloud: {
        intensity: 0,
        note: "",
        weight: 0
      },
      illumination: {
        intensity: 0,
        note: "",
        weight: 0
      },

      blur: {
        note: "",
        intensity: 0,
        weight: 0
      }
    }
  ],
  voice: [
    {
      explosion: {
        note: "爆炸音",
        intensity: 1,

        weight: 1
      },
      signalLoss: {
        note: "丢码",
        intensity: 1,
        weight: 1
      }
    },

    {
      explosion: {
        note: "爆炸音",
        intensity: 1,

        weight: 1
      },
      signalLoss: {
        note: "丢码",
        intensity: 1,
        weight: 1
      }
    }
  ],
  workCondition: {
    0: [""],
    1: [""],
    2: [""],
    3: [""]
  },
  conditionList: [""],
  intensityList: [],
  weightList: [],
  genIsPending: true,
  testIsPending: false
};
const adaptSlice = createSlice({
  name: "adaptSlice",
  initialState: initialState,
  reducers: {
    changeWorkConditionAction(state, { payload }) {
      state.workCondition = payload;
    },
    changeIntensityListAction(state, { payload }) {
      state.intensityList = payload;
    },
    changeWeightListAction(state, { payload }) {
      state.weightList = payload;
    },
    changeConditionList(state, { payload }) {
      state.conditionList = payload;
    },
    changeGuideNewCondiAction(state, { payload }) {
      state.guide = payload;
    },
    changeNavigateNewCondiAction(state, { payload }) {
      state.navigate = payload;
    },
    changeRemoteNewCondiAction(state, { payload }) {
      state.remote = payload;
    },
    changeVoiceNewCondiAction(state, { payload }) {
      state.voice = payload;
    }
  }
});

export default adaptSlice.reducer;

// export {
//   navigateAdaptReducer,
//   remoteAdaptReducer,
//   voiceAdaptReducer,
//   guideAdaptReducer
// };

export const {
  changeWorkConditionAction,
  changeIntensityListAction,
  changeWeightListAction,
  changeConditionList,
  changeGuideNewCondiAction,
  changeNavigateNewCondiAction,
  changeRemoteNewCondiAction,
  changeVoiceNewCondiAction
} = adaptSlice.actions;
