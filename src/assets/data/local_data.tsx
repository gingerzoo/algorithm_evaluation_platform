import React from "react";

import jpg0 from "../images/0.jpg";
import jpg1 from "../images/1.jpg";
import jpg2 from "../images/2.jpg";
import jpg3 from "../images/3.jpg";
import jpg4 from "../images/4.jpg";

import {
  ContainerOutlined,
  FundProjectionScreenOutlined,
  LaptopOutlined,
  NodeIndexOutlined,
  PullRequestOutlined,
  SendOutlined,
  SettingOutlined,
  ShareAltOutlined
} from "@ant-design/icons";
import { getItem } from "@/utils/getItem";

interface Iscene {
  [index: string]: number;
}

export const subs = [
  {
    title: "导引",
    link: "0guide",
    num: 0
  },
  {
    title: "导航",
    link: "1navigate",
    num: 1
  },
  {
    title: "遥感",
    link: "2remote",
    num: 2
  },
  {
    title: "语音",
    link: "3voice",
    num: 3
  }
];

export const sceneToNum: Iscene = {
  guide: 0,
  navigate: 1,
  remote: 2,
  voice: 3
};

export const sideNav = [
  {
    icon: <SettingOutlined />,
    title: "基础配置",
    link: "/profile/config"
  },
  {
    icon: <LaptopOutlined />,
    title: "基础效能",
    link: "/profile/basicwork"
    // sub: subs.map((item) =>
    //   getItem(item.title, "/profile/basicwork" + "/" + item.link.slice(1))
    // )
  },

  {
    icon: <PullRequestOutlined />,
    title: "可适应能力",
    link: "/profile/adapt"
    // sub: subs.map((item) =>
    //   getItem(item.title, "/profile/adapt" + "/" + item.link.slice(1))
    // )
  },
  {
    icon: <SendOutlined />,
    title: "可信赖能力",
    link: "/profile/trust"
  },
  {
    icon: <FundProjectionScreenOutlined />,
    title: "自学习能力",
    link: "/profile/selflearning"
  },
  {
    icon: <ShareAltOutlined />,
    title: "协同感知能力",
    link: "/profile/colawareness"
  },
  {
    icon: <NodeIndexOutlined />,
    title: "抽象感知能力",
    link: "/profile/absawareness"
  },
  {
    icon: <ContainerOutlined />,
    title: "测试结果总览",
    link: "/profile/result"
  }
];

export const headerNav = [
  {
    title: "我的项目名称",
    link: "/"
  },
  {
    title: "基础配置",
    link: "/profile/config"
  },
  {
    title: "基础效能",
    link: "/profile/basicwork"
  },
  {
    title: "自学习能力",
    link: "/profile/selflearning"
  },
  {
    title: "协同感知能力",
    link: "/profile/colawareness"
  },
  {
    title: "抽象感知能力",
    link: "/profile/absawareness"
  }
];

export const datasets = ["可见光", "红外", "雷达"];

export const mockPic: string[] = [jpg0, jpg1, jpg2, jpg3, jpg4];

interface Iworkwork {
  [index: string]: string;
}

export const tranEntoCh: Iworkwork = {
  occlusion: "遮挡",
  noise: "图像噪声",
  deformation: "形变",
  signalLoss: "丢码",
  illumination: "光照",
  blur: "模糊",
  cloud: "云雾",
  explosion: "爆炸音"
};

export const tranChtoEn: Iworkwork = {
  遮挡: "occlusion",
  图像噪声: "noise",
  形变: "deformation",
  丢码: "signalLoss",
  光照: "illumination",
  模糊: "blur",
  云雾: "cloud",
  爆炸音: "explosion"
};

export const getNote: Iworkwork = {
  occlusion: "目标被其他物体遮挡",
  noise: "传感器噪声",
  deformation: "相机倾角及畸变影响",
  signalLoss: "信号传输过程的丢码",
  illumination: "环境光强度",
  blur: "离焦和运动等因素造成的图像模糊",
  cloud: "云朵及雾霾等影响",
  explosion: "枪炮等爆炸音"
};

export type guideConditionType =
  | "occlusion"
  | "illumination"
  | "noise"
  | "cloud"
  | "deformation"
  | "blur";

export type navigateConditionType =
  | "occlusion"
  | "illumination"
  | "noise"
  | "cloud"
  | "deformation"
  | "blur";

export type remoteConditionType =
  | "occlusion"
  | "illumination"
  | "noise"
  | "cloud"
  | "deformation"
  | "blur";

export type voiceConditionType = "explosion" | "signalLoss";

export const picWorkCondition = [
  "occlusion",
  "illumination",
  "noise",
  "cloud",
  "deformation",
  "blur"
];

export const resultName = [
  {
    ch: "可适应性能力",
    en: "adapt"
  },
  {
    ch: "基础效能",
    en: "basic"
  },

  {
    ch: "可信赖性",
    en: "trust"
  },
  {
    ch: "自学习能力",
    en: "selfLearn"
  },
  {
    ch: "抽象感知",
    en: "abstract"
  },
  {
    ch: "协同感知",
    en: "collaAware"
  }
];

export const datasetInfos = [
  {
    name: "可见光数据集",
    status: "0",
    label_num: 10,
    sample_num: 446,
    sample_labled: 440,
    label_all: 1670
  },
  {
    name: "遥感数据集",
    status: "0",
    label_num: 16,
    sample_num: 298,
    sample_labled: 244,
    label_all: 1311
  },
  {
    name: "可见光数据集",
    status: "0",
    label_num: 10,
    sample_num: 446,
    sample_labled: 440,
    label_all: 1670
  },
  {
    name: "遥感数据集",
    status: "0",
    label_num: 16,
    sample_num: 298,
    sample_labled: 244,
    label_all: 1311
  }
];

export const basicResList = [
  ["中心位置误差", "区域重叠度", "跟踪鲁棒性"],
  ["相关性", "互信息", "定位精度"],
  ["F1-score", "mAP", "mAR"],
  ["字错误率", "句错误率"]
];

export const res_measurement = [
  "基础效能",
  "可适应能力",
  "可信赖能力",
  "自学习能力",
  "协同感知能力",
  "抽象感知能力"
];

export const attackWhite = [
  "基于白盒的攻击方法",
  " 快速梯度方法（二范数）",
  "快速梯度符号攻击方法",
  "投影梯度下降算法(无穷范数)",
  "投影棵度下降算法(二范数)",
  "基础法代攻击(二范数)",
  "基础法代攻击",
  "DeepFool(一范数)",
  " DeepFool",
  "Carlini & Wagner攻击(二范数)",
  "Newtonfool Attack"
];

export const model_desribe = [
  "首先要有基本指标，该基础指标为基础效能，即无干扰情况下的准确率，或者存在多个评价准则，最后加权得到的基础效能分数。",
  "通过对不同的干扰信息进行组合，可以考察智能体对重点场景的适应能力。",
  "针对对抗样本是否能够继续保持性能稳定。",
  "自学习能力是保证算法先进性的意向不可或缺的能力，为了有效评估自学习能力， 我们从小样本学习能力和在线学习能力两方面进行算法评估。",
  "多模态感知是智能体进行精准打击的有效手段，我们通过多波段融合与多目标协同测试智能体的协同感知能力。",
  "从不同维度分析场景态势"
];
