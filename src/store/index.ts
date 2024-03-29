import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import sceneReducer from "@/pages/BasicConfig/store";
import effectReducer from "@/pages/BasicWork/store";
import adaptReducer from "@/pages/AdaptAbli/store";
import datasetReducer from "@/pages/Dataset/store";
import trustReducer from "@/pages/TrustAbil/store";
import homeReducer from "@/pages/Home/store";
import multiwaveReducer from "@/pages/MultiWave/store";
import collaReducer from "@/pages/CollaAware/store";
import selflearnReducer from "@/pages/SelfLearn/store";
import noiceReducer from "@/pages/NoiseModel/store";
// import {
//   guideAdaptReducer,
//   navigateAdaptReducer,
//   remoteAdaptReducer,
//   voiceAdaptReducer
// } from "@/pages/AdaptAbli/store";

const store = configureStore({
  reducer: {
    basicConfig: sceneReducer,
    basicEffect: effectReducer,
    adaptAbili: adaptReducer,
    datasetMan: datasetReducer,
    trustAbili: trustReducer,
    home: homeReducer,
    multiwave: multiwaveReducer,
    collaAware: collaReducer,
    selfLearn: selflearnReducer,
    noiseModel: noiceReducer
  }
});

export type Istate = typeof store.getState;

export type IrootState = ReturnType<Istate>;
export type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IrootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;

export default store;
