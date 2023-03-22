import { createSlice } from "@reduxjs/toolkit";
import { Iwork } from "../..";
interface Iprop {
  //   work: "image" | "voice";

  tranEntoCh: Iwork;
  tranChtoEn?: Iwork;
  workCondition3?: Iwork;
}

const initialState: Iprop = {
  tranEntoCh: {
    explosion: {
      note: "爆炸音",
      intensity: 2,

      weight: 7
    },
    signalLoss: {
      note: "丢码",
      intensity: 5,
      weight: 9
    }
  },

  tranChtoEn: {
    explosion: {
      note: "爆炸音",
      intensity: 2,

      weight: 7
    },
    signalLoss: {
      note: "丢码",
      intensity: 5,
      weight: 9
    }
  }
};

const voiceAdaptSlice = createSlice({
  name: "voiceAdapt",
  initialState,
  reducers: {}
});

export default voiceAdaptSlice.reducer;
