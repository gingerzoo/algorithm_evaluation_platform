import { createSlice } from "@reduxjs/toolkit";
import { Iwork } from "../..";

interface Iprop {
  //   work: "image" | "voice";
  [index: string]: Iwork;
  tranEntoCh: Iwork;
  tranChtoEn: Iwork;
}

const initialState: Iprop = {
  tranEntoCh: {
    occlusion: {
      intensity: 0,
      weight: 9,
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

  tranChtoEn: {
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
};

const guideAdaptSlice = createSlice({
  name: "guideAdapt",
  initialState,
  reducers: {
    changeWk1occlusionAction(state, { payload }) {
      state.tranEntoCh.occlusion.intensity = payload;
    },
    changeWk1illuminationAction(state, { payload }) {
      state.tranEntoCh.illumination.intensity = payload;
    },
    changeWk1deformationAction(state, { payload }) {
      state.tranEntoCh.deformation.intensity = payload;
    },
    changeWk1noiseAction(state, { payload }) {
      state.tranEntoCh.noise.intensity = payload;
    },
    changeWk2cloudAction(state, { payload }) {
      state.tranChtoEn.cloud.intensity = payload;
    },
    changeWk2illuminationAction(state, { payload }) {
      state.tranChtoEn.illumination.intensity = payload;
    },
    changeWk2blurAction(state, { payload }) {
      state.tranChtoEn.blur.intensity = payload;
    }
  }
});

export const {
  changeWk1occlusionAction,
  changeWk1deformationAction,
  changeWk1illuminationAction,
  changeWk1noiseAction,
  changeWk2blurAction,
  changeWk2cloudAction,
  changeWk2illuminationAction
} = guideAdaptSlice.actions;

export default guideAdaptSlice.reducer;
