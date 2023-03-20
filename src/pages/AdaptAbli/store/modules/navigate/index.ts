import { createSlice } from "@reduxjs/toolkit";
import { Iwork } from "../..";

interface Iprop {
  //   work: "image" | "voice";
  navigate: Iwork[];
}

const initialState: Iprop = {
  navigate: [
    {
      occlusion: {
        label: "遮挡",
        condition: "occlusion",
        intensity: 6,
        weight: 9
      },
      illumination: {
        label: "光照",
        intensity: 5,
        condition: " illumination",
        weight: 9
      },
      deformation: {
        label: "形变",
        intensity: 2,
        condition: " deformation",
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
      clouds: {
        label: "云雾",
        intensity: 5,
        condition: "clouds",
        weight: 7
      },
      illumination: {
        label: "光照",
        intensity: 6,
        condition: "illumination",
        weight: 6
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
        condition: " ambiguty",
        weight: 9
      },
      dropout: {
        label: "丢码",
        intensity: 3,
        condition: "dropout",
        weight: 8
      }
    }
  ]
};

const navigateAdaptSlice = createSlice({
  name: "navigateAdapt",
  initialState,
  reducers: {}
});

export default navigateAdaptSlice.reducer;
