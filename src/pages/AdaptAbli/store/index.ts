import { workCondition1, workCondition2 } from "@/assets/data/local_data";
import { createSlice } from "@reduxjs/toolkit";

export interface Iwork {
  [index: string]: {
    label: string;
    condition: string;
    intensity: number;
    weight: number;
  };
}
interface Iprop {
  //   work: "image" | "voice";
  [workCondition: string]: Iwork[];
}

const initialState: Iprop = {
  guide: [
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
  ],
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
  ],
  remote: [
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
  ],
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
const adaptSlice = createSlice({
  name: "adaptSlice",
  initialState: initialState,
  reducers: {}
});

export default adaptSlice.reducer;
