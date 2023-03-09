import { workCondition2 } from "@/assets/data/local_data";
import { createSlice } from "@reduxjs/toolkit";

interface Iwork {
  label: string;
  condition: string;
  intensity: number;
  weight: number;
}
interface Iprop {
  work: "image" | "voice";
  workCondition: Iwork[][];
}

const initialState: Iprop = {
  work: "image",
  workCondition: [
    [
      {
        label: "遮挡",
        condition: workCondition2["遮挡"],
        intensity: 6,
        weight: 9
      },
      {
        condition: workCondition2["光照"],
        label: "光照",
        intensity: 5,
        weight: 9
      },
      {
        condition: workCondition2["形变"],
        label: "形变",
        intensity: 2,
        weight: 7
      },
      {
        condition: workCondition2["图像噪声"],
        label: "图像噪声",
        intensity: 3,
        weight: 8
      }
    ],
    [
      {
        condition: workCondition2["云雾"],
        label: "云雾",
        intensity: 5,
        weight: 7
      },
      {
        condition: workCondition2["光照"],
        label: "光照",
        intensity: 6,
        weight: 6
      },
      {
        condition: workCondition2["形变"],
        label: "形变",
        intensity: 4,
        weight: 9
      },
      {
        condition: workCondition2["模糊"],
        label: "模糊",
        intensity: 3,
        weight: 9
      },
      {
        condition: workCondition2["丢码"],
        label: "丢码",
        intensity: 3,
        weight: 8
      }
    ]
  ]
};
const adaptSlice = createSlice({
  name: "adaptSlice",
  initialState: initialState,
  reducers: {}
});
