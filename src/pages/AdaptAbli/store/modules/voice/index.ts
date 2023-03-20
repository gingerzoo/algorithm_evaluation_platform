import { createSlice } from "@reduxjs/toolkit";
import { Iwork } from "../..";

interface Iprop {
  //   work: "image" | "voice";
  voice: Iwork[];
}

const initialState: Iprop = {
  voice: [
    {
      dropout: {
        label: "丢码",
        intensity: 5,
        condition: "dropout",
        weight: 9
      },
      explosion: {
        label: "爆炸音",
        intensity: 2,
        condition: "explosion",
        weight: 7
      },
      noise: {
        label: "图像噪声",
        intensity: 3,
        condition: "noise",
        weight: 8
      }
    },

    {
      whitenoise: {
        label: "白噪声",
        intensity: 5,
        condition: "whitenoise",
        weight: 7
      },
      deformation: {
        label: "形变",
        intensity: 4,
        condition: "deformation",
        weight: 9
      },
      ambiguty: {
        label: "模糊",
        intensity: 3,
        condition: "ambiguty",
        weight: 9
      },
      dropout: {
        label: "丢码",
        condition: "dropout",
        intensity: 3,
        weight: 8
      }
    }
  ]
};

const voiceAdaptSlice = createSlice({
  name: "voiceAdapt",
  initialState,
  reducers: {}
});

export default voiceAdaptSlice.reducer;
