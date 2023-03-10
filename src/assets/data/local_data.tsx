import React from "react";

import {
  FundProjectionScreenOutlined,
  LaptopOutlined,
  NodeIndexOutlined,
  PullRequestOutlined,
  SendOutlined,
  SettingOutlined,
  ShareAltOutlined
} from "@ant-design/icons";
import { getItem } from "@/utils/getItem";

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

export const sideNav = [
  {
    icon: <SettingOutlined />,
    title: "基础配置",
    link: "/config"
  },
  {
    icon: <LaptopOutlined />,
    title: "基础效能",
    link: "/basicwork",
    sub: subs.map((item) =>
      getItem(item.title, "/basicwork" + "/" + item.link.slice(1))
    )
  },

  {
    icon: <PullRequestOutlined />,
    title: "可适应能力评估",
    link: "/adapt",
    sub: subs.map((item) =>
      getItem(item.title, "/adapt" + "/" + item.link.slice(1))
    )
  },
  {
    icon: <SendOutlined />,
    title: "可信赖性",
    link: "/trust"
  },
  {
    icon: <FundProjectionScreenOutlined />,
    title: "自学习能力",
    link: "/selflearning"
  },
  {
    icon: <ShareAltOutlined />,
    title: "协同感知能力",
    link: "/colawareness"
  },
  {
    icon: <NodeIndexOutlined />,
    title: "抽象感知能力",
    link: "/absawareness"
  }
];

export const headerNav = [
  {
    title: "我的项目名称",
    link: "/"
  },
  {
    title: "基础配置",
    link: "/config"
  },
  {
    title: "基础效能",
    link: "/basicwork"
  },
  {
    title: "自学习能力",
    link: "/selflearning"
  },
  {
    title: "协同感知能力",
    link: "/colawareness"
  },
  {
    title: "抽象感知能力",
    link: "/absawareness"
  }
];

export const datasets = ["可见光", "红外", "雷达"];

export const mockPic: string[] = [
  `    https://ts1.cn.mm.bing.net/th/id/R-C.67dfc143a0d871cecb14f2ddc5a602dc?rik=E02wxizWaCj4MQ&riu=http%3a%2f%2fwww.kutoo8.com%2fupload%2fthumb%2f021594%2fa6c7a45a5ec124e673a5a70906ab3ac7.jpg&ehk=cbe%2f88zJtNPZQdXFx5NXQqzYMRZzLWP%2f7NXgLSK8jXE%3d&risl=&pid=ImgRaw&r=0`,
  `https://ts1.cn.mm.bing.net/th/id/R-C.3fb196a05953e88a94295eb49df11942?rik=Urz0Fk9q1UAe7g&riu=http%3a%2f%2fwww.appzyw.net%2fupfiles%2fimage%2f202001%2f20200112113023818.jpg&ehk=sP8hw7pizuW6ifpbEjxjjnja3dVzEViLMyBiVgscB1o%3d&risl=&pid=ImgRaw&r=0`,
  `https://www.mlito.com/wp-content/uploads/2018/03/bf478dbc95.jpg`,
  `https://ts1.cn.mm.bing.net/th/id/R-C.775f0eeed8f65791a1c75adb2e5f1e2f?rik=BB3NfbqZIFPGYA&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2f6%2f68%2fe2ac965866.jpg&ehk=s9ba62nvyHSFtRAwXpvt5zV3IExEkqKXTc%2b7n1bVgN8%3d&risl=&pid=ImgRaw&r=0`,
  `https://pic.3gbizhi.com/2020/0722/20200722081817153.jpg`
];

export const workCondition1 = {
  occlusion: "遮挡",
  noise: "图像噪声",
  deformation: "形变",
  dropout: "丢码",
  illumination: "光照",
  ambiguity: "模糊",
  clouds: "云雾",
  explosion: "爆炸音",
  whitenoise: "白噪音"
};

export const workCondition2 = {
  遮挡: "occlusion",
  图像噪声: "noise",
  形变: "deformation",
  丢码: "dropout",
  光照: "illumination",
  模糊: "ambiguity",
  云雾: "clouds",
  爆炸音: "explosion",
  白噪音: "whitenoise"
};

export type imageCondition =
  | "occlusion"
  | "illumination"
  | "noise"
  | "clouds"
  | "dropout"
  | "deformation"
  | "ambiguity"
  | "whitenoise"
  | "explosion";

export type picConditionType =
  | "occlusion"
  | "illumination"
  | "deformation"
  | "nosie"
  | "clouds"
  | "dropout"
  | "ambiguity";
