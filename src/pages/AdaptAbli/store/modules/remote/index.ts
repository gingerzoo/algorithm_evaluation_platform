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

const remoteAdaptSlice = createSlice({
  name: "remoteAdapt",
  initialState,
  reducers: {}
});

export default remoteAdaptSlice.reducer;
