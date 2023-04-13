import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  works: [
    {
      illumination: {
        intensity: 5,

        weight: 1
      },
      deformation: {
        intensity: 3,

        weight: 1
      },
      noise: {
        intensity: 6,

        weight: 1
      }
    },
    {
      cloud: {
        intensity: 4,

        weight: 1
      },
      illumination: {
        intensity: 4,

        weight: 1
      },

      blur: {
        intensity: 6,
        weight: 1
      }
    }
  ],
  genIsPending: false,
  testIsPending: false,
  genData_status: -1,
  workResult: [],
  needGenData: false,
  checkList: [true, true]
};

const adaptGuideSlice = createSlice({
  name: "adaptGuide",
  initialState,
  reducers: {}
});
