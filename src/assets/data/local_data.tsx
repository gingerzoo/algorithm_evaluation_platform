import React from "react";

import jpg0 from "../images/0.jpg";
import jpg1 from "../images/1.jpg";
import jpg2 from "../images/2.jpg";
import jpg3 from "../images/3.jpg";
import jpg4 from "../images/4.jpg";

import {
  BarChartOutlined,
  ContainerOutlined,
  FundProjectionScreenOutlined,
  LaptopOutlined,
  NodeIndexOutlined,
  PullRequestOutlined,
  SendOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { getItem } from "@/utils/getItem";
import { IruleData, Iwork } from "@/type";

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
    icon: <BarChartOutlined />,
    title: "多波段协同能力",
    link: "/profile/multiwave"
  },
  {
    icon: <NodeIndexOutlined />,
    title: "抽象感知能力",
    link: "/profile/absawareness"
  },
  {
    icon: <FundProjectionScreenOutlined />,
    title: "自学习能力",
    link: "/profile/selflearning"
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
    ch: "基础效能",
    en: "basic"
  },
  {
    ch: "可适应性能力",
    en: "adapt"
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
  ["互信息", "相关性", "定位精度"],
  ["F1-score", "mAP", "mAR"],
  ["字正确率", "句正确率"]
];

export const basicAllResList = [
  ["中心位置误差", "区域重叠度", "跟踪鲁棒性", "总体分数"],
  ["互信息", "相关性", "定位精度", "总体分数"],
  ["F1-score", "mAP", "mAR", "总体分数"],
  ["字正确率", "句正确率", "总体分数"]
];

export const basicResInfoList = [
  ["错误率预计为5%以下", "区域重叠度", "稳定跟踪比例为80%以上"],
  ["错误率预计为5%以下", "阈值预计为50%以上", "稳定跟踪比例为80%以上"],
  [
    "IOU阈值设置为0.75时,分数不低于0.8",
    "IOU设置为0.5到0.95时,分数不低于0.6",
    "平均查全率分数不低于0.8"
  ],
  ["阈值预计为50%以上", "阈值预计为50%以上"]
];

export const attackWhite = ["Optim", "Mim", "Bim", "PGD"];

export const attackBlack = ["Optim", "Mim", "Bim", "PGD"];

export const model_desribe = [
  "首先要有基本指标，该基础指标为基础效能，即无干扰情况下的准确率，或者存在多个评价准则，最后加权得到的基础效能分数。",
  "通过对不同的干扰信息进行组合，可以考察智能体对重点场景的适应能力。",
  "针对对抗样本是否能够继续保持性能稳定。",
  "自学习能力是保证算法先进性的意向不可或缺的能力，为了有效评估自学习能力， 我们从小样本学习能力和在线学习能力两方面进行算法评估。",
  "多模态感知是智能体进行精准打击的有效手段，我们通过多波段融合与多目标协同测试智能体的协同感知能力。",
  "从不同维度分析场景态势"
];

export const rules_Data: IruleData[] = [
  {
    category: "policy-china",
    title: "深圳经济特区人工智能产业促进条例",
    website:
      "http://www.szrd.gov.cn/szrd_zlda/szrd_zlda_flfg/flfg_szfg/content/post_834707.html",
    time: "2022.9",
    country: "中国",
    scenario: "智能产业",
    publisher: "深圳市人大常委会",
    introduction:
      "我国首部人工智能产业专项立法——《深圳经济特区人工智能产业促进条例》（以下简称《条例》）今天正式公布，并拟于今年11月1日起实施。为破解人工智能产品落地难问题，《条例》提出创新产品准入制度，对于国家、地方尚未制定标准但符合国际先进产品标准或者规范的低风险人工智能产品和服务，允许通过测试、试验、试点等方式开展先行先试。"
  },
  {
    category: "policy-china",
    title: "中华人民共和国民法典",
    website:
      "http://gongbao.court.gov.cn/Details/51eb6750b8361f79be8f90d09bc202.html",
    time: "2020.05",
    country: "中国",
    scenario: "法律",
    publisher: "十三届全国人大三次会议",
    introduction:
      "《中华人民共和国民法典》被称为“社会生活的百科全书”，是新中国第一部以法典命名的法律，在法律体系中居于基础性地位，也是市场经济的基本法。"
  },
  {
    category: "policy-china",
    title: "中华人民共和国数据安全法",
    website:
      "http://www.npc.gov.cn/npc/c30834/202106/7c9af12f51334a73b56d7938f99a788a.shtml",
    time: "2021.06",
    country: "中国",
    scenario: "法律",
    publisher: "第十三届全国人民代表大会",
    introduction:
      "该部法律体现了总体国家安全观的立法目标，聚焦数据安全领域的突出问题，确立了数据分类分级管理，建立了数据安全风险评估、监测预警、应急处置，数据安全审查等基本制度，并明确了相关主体的数据安全保护义务，这是我国首部数据安全领域的基础性立法。"
  },
  {
    category: "policy-china",
    title: "深圳经济特区数据条例",
    website: "http://www.sz.gov.cn/attachment/0/980/980196/9835431.pdf",
    time: "2021.06",
    country: "中国",
    scenario: "法律",
    publisher: "深圳市第七届人民代表大会",
    introduction:
      "《深圳经济特区数据条例》(《条例》)获深圳市七届人大常委会第二次会议表决通过。 《条例》内容涵盖了个人数据、公共数据、数据要素市场、数据安全等方面，是国内数据领域首部基础性、综合性立法"
  },
  {
    category: "policy-china",
    title: "浙江省数字经济促进条例",
    website: "https://jxt.zj.gov.cn/art/2020/12/24/art_1229123459_4349621.html",
    time: "2020.12",
    country: "中国",
    scenario: "法律",
    publisher: "浙江省经济和信息化厅",
    introduction:
      "《浙江省数字经济促进条例》规范内容涵盖了数字经济基础设施建设、产业数字化、数字产业化、有关部门的数字治理等诸多方面，为数字经济的发展搭好了框架，为浙江省各地数字经济的发展指明了方向。"
  },
  {
    category: "policy-china",
    title: "关于加强全省科技伦理治理的实施意见",
    website:
      "http://kjt.shandong.gov.cn/art/2023/4/14/art_103585_10306175.html",
    time: "2023.04",
    country: "中国",
    scenario: "意见",
    publisher: "山东省科学技术厅",
    introduction:
      "为深入贯彻落实中共中央办公厅、国务院办公厅《关于加强科技伦理治理的意见》，健全完善全省科技伦理治理体系，推动科技向善、造福人类，省科技厅等9部门研究制定了《关于加强全省科技伦理治理的实施意见》"
  },
  {
    category: "policy-foreign",
    title: "人工智能伦理问题建议书",
    website: "https://unesdoc.unesco.org/ark:/48223/pf0000380455_chi",
    time: "2021.11",
    country: "联合国",
    scenario: "规范",
    publisher: "联合国",
    introduction:
      "联合国教科文组织于2021年11月通过了《人工智能伦理问题建议书》，这是首个关于以符合伦理要求的方式运用人工智能的全球框架。"
  },
  {
    category: "policy-foreign",
    title: "Transparency and Trust in the Cognitive Era",
    website:
      "https://www.ibm.com/blogs/think/2017/01/ibm-cognitive-principles/",
    time: "2017.01",
    country: "美国",
    scenario: "原则",
    publisher: "IBM",
    introduction:
      "通常被称为人工智能的新一代技术及其所帮助的认知系统将很快触及工作和生活的方方面面，并有可能从根本上使它们变得更好。 这是因为这些系统可以摄取并理解所有形式的数据，而这些数据正在以前所未有的速度产生。 像 IBM 的 Watson 这样的认知系统可以对这些数据进行推理，形成假设和判断。 最重要的是，这些系统不是简单地编程的，它们是从自己的经验、与人类的互动以及判断的结果中学习的。"
  },
  {
    category: "policy-ethics",
    title: "新一代人工智能伦理规范",
    website: "https://www.most.gov.cn/kjbgz/202109/t20210926_177063.html",
    time: "2021.09",
    country: "中国",
    scenario: "安全",
    publisher: "中华人民共和国科技部",
    introduction:
      "国家新一代人工智能治理专业委员会发布了《新一代人工智能伦理规范》(以下简称《伦理规范》)，旨在将伦理道德融入人工智能全生命周期，为从事人工智能相关活动的自然人、法人和其他相关机构等提供伦理指引。"
  },
  {
    category: "policy-ethics",
    title: "关于加强科技伦理治理的意见",
    website: "https://www.gov.cn/zhengce/2022-03/20/content_5680105.htm",
    time: "2022.03",
    country: "中国",
    scenario: "意见",
    publisher: "中华人民共和国中央人民政府",
    introduction:
      "科技伦理是开展科学研究、技术开发等科技活动需要遵循的价值理念和行为规范，是促进科技事业健康发展的重要保障。当前，我国科技创新快速发展，面临的科技伦理挑战日益增多，但科技伦理治理仍存在体制机制不健全、制度不完善、领域发展不均衡等问题，已难以适应科技创新发展的现实需要。为进一步完善科技伦理体系，提升科技伦理治理能力，有效防控科技伦理风险，不断推动科技向善、造福人类，实现高水平科技自立自强，现就加强科技伦理治理提出如下意见。"
  },
  {
    category: "policy-other",
    title: "关于推进本市新一代人工智能标准体系建设的指导意见",
    website:
      "https://www.sheitc.sh.gov.cn/cyfz/20210709/c110acca975c4302a63fe1c8437ca0fb.html",
    time: "2021.07",
    country: "中国",
    scenario: "指导意见",
    publisher: "上海市经济和信息化委员会",
    introduction:
      "为加快建设人工智能“上海高地”，打造世界级产业集群，推进城市数字化转型，上海市经济信息化委、市市场监管局共同制定了《关于推进本市新一代人工智能标准体系建设的指导意见》。"
  },
  {
    category: "policy-other",
    title: "最高人民法院关于规范和加强人工智能司法应用的意见",
    website: "https://www.court.gov.cn/fabu-xiangqing-382461.html",
    time: "2022.12",
    country: "中国",
    scenario: "意见",
    publisher: "中华人民共和国最高人民法院",
    introduction:
      "为深入学习贯彻党的二十大精神，深入贯彻习近平法治思想，贯彻落实《中华人民共和国国民经济和社会发展第十四个五年规划和2035年远景目标纲要》和《新一代人工智能发展规划》，推动人工智能同司法工作深度融合，全面深化智慧法院建设，努力创造更高水平的数字正义，结合人民法院工作实际，制定本意见。"
  },
  {
    category: "policy-other",
    title: "生成式人工智能服务管理办法（征求意见稿）",
    website:
      "http://www.moj.gov.cn/pub/sfbgw/lfyjzj/lflfyjzj/202304/t20230411_476092.html",
    time: "2023.04",
    country: "中国",
    scenario: "意见",
    publisher: "国家互联网信息办公室",
    introduction:
      "为促进生成式人工智能技术健康发展和规范应用，根据《中华人民共和国网络安全法》等法律法规，国家互联网信息办公室起草了《生成式人工智能服务管理办法（征求意见稿）》，现向社会公开征求意见"
  },
  {
    category: "country-strategy",
    title: "新一代人工智能发展规划",
    website:
      "https://www.gov.cn/zhengce/content/2017-07/20/content_5211996.htm",
    time: "2017.07",
    country: "中国",
    scenario: "发展规划",
    publisher: "国务院",
    introduction:
      "人工智能的迅速发展将深刻改变人类社会生活、改变世界。为抢抓人工智能发展的重大战略机遇，构筑我国人工智能发展的先发优势，加快建设创新型国家和世界科技强国，按照党中央、国务院部署要求，制定本规划。"
  },
  {
    category: "industry-strategy",
    title: "中国关于加强人工智能伦理治理的立场文件",
    website:
      "https://www.fmprc.gov.cn/web/wjb_673085/zfxxgk_674865/gknrlb/tywj/zcwj/202211/t20221117_10976728.shtml",
    time: "2023.04",
    country: "中国",
    scenario: "政策文件",
    publisher: "中国外交部",
    introduction:
      "人工智能作为最具代表性的颠覆性技术，在给人类社会带来潜在巨大发展红利的同时，其不确定性可能带来许多全球性挑战，甚至引发根本性的伦理关切。在伦理层面，国际社会普遍担心如不加以规范，人工智能技术的误用滥用恐将损害人的尊严和平等、侵犯人权和基本自由、加剧歧视和偏见、冲击现有法律体系等，并对各国政府管理、国防建设、社会稳定其至全球治理产生深远影响。"
  },
  {
    category: "industry-strategy",
    title: "关于加快场景创新以人工智能高水平应用促进经济高质量发展的指导意见",
    website:
      "https://www.gov.cn/zhengce/zhengceku/2022-08/12/content_5705154.htm",
    time: "2022.07",
    country: "中国",
    scenario: "意见",
    publisher: "中华人民共和国中央人民政府",
    introduction:
      "为贯彻落实党中央、国务院关于推动人工智能发展的决策部署，统筹推进人工智能场景创新，着力解决人工智能重大应用和产业化问题，全面提升人工智能发展质量和水平，更好支撑高质量发展，按照《中华人民共和国国民经济和社会发展第十四个五年规划和2035年远景目标纲要》《新一代人工智能发展规划》等要求，制定本指导意见。"
  },
  {
    category: "trend",
    title: "人工智能白皮书",
    website:
      "http://www.impcia.net/Uploads/report/2020-04-28/5ea7dc7162641.pdf",
    time: "2020.02",
    country: "欧盟",
    scenario: "规划",
    publisher: "欧盟委员会",
    introduction:
      "欧盟委员会发布《人工智能白皮书》，提出一系列政策措施，旨在大力促进欧洲人工智能研发，同时有效应对其可能带来的风险。"
  },
  {
    category: "trend",
    title: "人工智能路线图",
    website:
      "https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/949539/AI_Council_AI_Roadmap.pdf",
    time: "2021.05",
    country: "英国",
    scenario: "规划",
    publisher: "英国人工智能委员会",
    introduction:
      "英国人工智能委员会发布《人工智能路线图》，为政府部门设定人工智能（AI）长期目标并提出近期发展方向建议，并呼吁政府制定国家人工智能战略，明确优先发展领域并制定时间表，以使英国成为最适合AI发展的国家之一。该报告从4个方向为英国发展人工智能提出了16条建议。"
  },
  {
    category: "trend",
    title: "人工智能倡议",
    website: "https://www.whitehouse.gov/",
    time: "2019.02",
    country: "美国",
    scenario: "意见",
    publisher: "美国白宫",
    introduction:
      "美国人工智能(AI)倡议”基本框架从研发、AI基础设施、AI管理、劳动力、以及国际参与等方面入手，推进人工智能(AI)产业发展。"
  },
  {
    category: "national-standard",
    title: "《信息技术 人工智能 术语》：GB/T 41867-2022",
    website:
      "https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=195F522C14AD9A1A0094FF66D0B1EF1B",
    time: "2022.1",
    country: "中国",
    scenario: "标准",
    publisher: "国家市场监督管理总局、国家标准化管理委员会",
    introduction:
      "该标准规定了人工智能领域的常用术语和定义，包括机器学习、深度学习、自然语言处理、计算机视觉等方面的概念。"
  },
  {
    category: "national-standard",
    title: "《信息技术 人工智能 图像识别算法测试方法》：GB/T 30114-2013",
    website: "",
    time: "",
    country: "",
    scenario: "",
    publisher: "",
    introduction:
      "该标准规定了图像识别算法的测试方法和技术要求，包括图像预处理、特征提取、分类器训练和测试等方面的测试流程和评价标准"
  },
  {
    category: "national-standard",
    title: "《信息技术 人工智能 语音识别数据交换格式》：GB/T 30115-2013",
    website: "",
    time: "",
    country: "",
    scenario: "",
    publisher: "",
    introduction:
      "该标准规定了语音识别数据交换的格式和规范，包括语音数据的采集、处理、传输和存储等方面的技术要求和标准。"
  },
  {
    category: "national-standard",
    title: "《信息技术 人工智能 语音合成算法测试方法》：GB/T 30116-2013",
    website: "",
    time: "",
    country: "",
    scenario: "",
    publisher: "",
    introduction:
      "该标准规定了语音合成算法的测试方法和技术要求，包括语音数据的采集、处理、传输和存储等方面的测试流程和评价标准。"
  },
  {
    category: "national-standard",
    title: "《信息技术 人工智能 自然语言处理》：GB/T 30117-2013",
    website: "",
    time: "",
    country: "",
    scenario: "",
    publisher: "",
    introduction:
      "该标准规定了自然语言处理的技术要求和评价标准，包括分词、词性标注、句法分析、机器翻译等方面的处理方法和标准。"
  },
  {
    category: "national-standard",
    title: "信息技术 智能语音交互测试方法 第1部分：语音识别",
    website:
      "https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=FBC42DCA21C02EAD4C250CF04F5BBD54",
    time: "2022.10",
    country: "中国",
    scenario: "测试",
    publisher: "国家市场监督管理总局、国家标准化管理委员会",
    introduction:
      "属于信息技术领域中的智能语音交互测试方法。该标准规定了智能语音交互测试方法的术语和定义、测试环境、测试方法和评价方法等。该标准适用于智能语音交互系统的研发、测试和评估。"
  },
  {
    category: "national-standard",
    title: "信息技术 智能语音交互测试方法 第2部分：语义理解",
    website:
      "https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=8A593A462288B3EAA9FCB553AAD49E82",
    time: "2022.10",
    country: "中国",
    scenario: "测试",
    publisher: "国家市场监督管理总局、国家标准化管理委员会",
    introduction:
      "属于信息技术领域中的智能语音交互系统。该标准规定了智能语音交互系统的术语和定义、系统架构、功能要求、性能要求和测试方法等。该标准适用于智能语音交互系统的研发、设计和测试。该标准包括以下部分：术语和定义：该部分规定了智能语音交互系统相关的术语和定义，包括语音识别、语音合成、自然语言处理等概念。系统架构：该部分规定了智能语音交互系统的架构和组成，包括语音识别模块、语音合成模块、自然语言处理模块等。功能要求：该部分规定了智能语音交互系统应具备的功能和性能，包括语音识别准确率、语音合成自然度、自然语言处理理解度等。性能要求：该部分规定了智能语音交互系统的性能要求和评价指标，包括语音识别的速度、准确性、可靠性等指标，以及自然语言处理的响应时间、理解深度等指标。测试方法：该部分规定了智能语音交互系统的测试方法和流程，包括语音识别测试、语音合成测试、自然语言处理测试等。该标准旨在规范智能语音交互系统的设计和开发，提高智能语音交互系统的质量和性能，促进智能语音技术的发展和应用。"
  },
  {
    category: "international-standard",
    title: "ISO/IEC 21287：2022",
    website: "https://www.iso.org/home.html",
    time: "2022.12",
    country: "",
    scenario: "标准",
    publisher: "ISO",
    introduction:
      "这项标准规定了人工智能系统的安全性和隐私保护指南，包括数据保护、网络安全、加密等方面。它为人工智能系统的开发者和使用者提供了安全性和隐私保护的指南，有助于保障人工智能系统的安全性和隐私性。"
  },
  {
    category: "international-standard",
    title: "ISO/IEC 2382:2015",
    website: "https://www.iso.org/standard/63598.html",
    time: "2015.01",
    country: "国际",
    scenario: "标准",
    publisher:
      "International Organization for Standardization/International Electrotechnical Commission",
    introduction:
      "是信息技术领域中的一项基础性标准，旨在定义信息技术相关的术语和词汇，包括计算机科学、软件工程、数据通信、信息安全等方面的概念。"
  },
  {
    category: "meeting",
    title: "ICAI'23 - The 25th Int'l Conf on Artificial Intelligence",
    website: "https://american-cse.org/csce2023/conferences-ICAI",
    time: "2023",
    country: "美国",
    scenario: "会议",
    publisher: "CPS",
    introduction:
      "ICAI 是一个国际会议，为希望建立工作关系和获取最新研究成果的研究人员、学者、专业人士、学生和院士提供服务。它与许多其他研究会议联合举行（同一地点和日期）；即 2023 年计算机科学、计算机工程和应用计算世界大会 (CSCE'23)。"
  },
  {
    category: "meeting",
    title: "SEKE23",
    website: "https://ksiresearch.org/seke/seke23.html",
    time: "2023",
    country: "美国",
    scenario: "会议",
    publisher: "SEKE23 Conference Secretariat",
    introduction:
      "The Thirty Fifth International Conference on Software Engineering and Knowledge Engineering (SEKE23) will be held both as a live conference at a major hotel in San Francisco Bay, USA and as a virtual conference at the KSIR Virtual Conference Center, USA, from July 1 to July 10, 2023."
  },
  {
    category: "book",
    title: "Deep Learning",
    website: "https://www.deeplearningbook.org/",
    time: "2016",
    country: "美国",
    scenario: "综合",
    publisher: "MIT Press",
    introduction:
      "The Deep Learning textbook is a resource intended to help students and practitioners enter the field of machine learning in general and deep learning in particular. The online version of the book is now complete and will remain available online for free."
  },
  {
    category: "report-thinktank",
    title: "人工智能、数字化的立法现状及未来展望",
    website: "https://www.allbrightlaw.com/CN/10475/89bec284b38f8c0f.aspx",
    time: "2021.07",
    country: "中国",
    scenario: "现状及展望",
    publisher: "上海市锦天城律师事务所",
    introduction:
      "2021年7月8日至10日，由国家发展和改革委员会、工业和信息化部、科学技术部、国家互联网信息办公室、中国科学院、中国工程院、中国科学技术协会，以及上海市人民政府共同主办的2021世界人工智能大会在上海世博中心和上海世博展览馆同时举行。"
  },
  {
    category: "report-thinktank",
    title: "全球人工智能战略与政策观察",
    website:
      "http://www.caict.ac.cn/kxyj/qwfb/ztbg/202012/P020201229520426700957.pdf",
    time: "2020.12",
    country: "中国",
    scenario: "战略与政策",
    publisher: "中国信通院",
    introduction:
      "近年来，主要国家和地区相继出台了人工智能相关战略和规划文件，将政策重点聚焦在加强投资和人才培养、促进合作开放以及完善监管和标准建设上，全球人工智能进入战略布局加快、产业应用加速发展落地阶段。"
  },
  {
    category: "report-thinktank",
    title: "2019年中国人工智能行业政策解读概览",
    website: "http://pdf.dfcfw.com/pdf/H3_AP202008061396710412_1.pdf",
    time: "2019.12",
    country: "中国",
    scenario: "政策",
    publisher: "头豹",
    introduction:
      "中国政府相继出台一系列政策规范，促进人工智能应用使用现代化产业发展需求，推动人工智能行业步入发展新阶段。"
  },
  {
    category: "news",
    title: "大智能时代的关键之举——五问AI国家战略",
    website: "https://www.gov.cn/zhengce/2017-07/22/content_5212526.htm",
    time: "2017.07",
    country: "中国",
    scenario: "国家战略",
    publisher: "新华社",
    introduction:
      "如同工业时代的蒸汽机和信息时代的互联网，人工智能（AI）在“大智慧”时代扮演着越来越重要的角色。新一代人工智能技术的发展，正颠覆你我的生活，深刻改变世界。"
  },
  {
    category: "news",
    title: "世界互联网大会：从四方面确立人工智能伦理规范",
    website: "https://cn.wicinternet.org/2023-06/16/content_36635688.htm",
    time: "2023.06",
    country: "中国",
    scenario: "伦理规范",
    publisher: "光明网",
    introduction:
      "世界互联网大会数字文明尼山对话新闻发布会在京举行。会上，世界互联网大会秘书长任贤良介绍，世界互联网大会数字文明尼山对话将于6月25日至27日在山东济宁曲阜召开，主题为“人工智能时代：构建交流、互鉴、包容的数字世界”。"
  }
];

export const rules_list = [
  "法律法规",
  "政策规范",
  "行业规范",
  "研究文献",
  "新闻报告"
];

interface Irule {
  [index: string]: string;
}

export const rules_children: Irule[] = [
  {
    中国法规: "policy-china",
    国际法规: "policy-foreign",
    伦理法规: "policy-ethics",
    其它: "policy-other"
  },
  {
    国家战略: "country-strategy",
    行业策略: "industry-strategy",
    国际趋势: "trend"
  },
  {
    国际: "national-standard",
    国际标准: "international-standard"
  },
  {
    期刊论文: "journal",
    会议: "meeting",
    书籍: "book"
  },
  {
    政府报告: "report-government",
    智库报告: "report-thinktank",
    媒体新闻: "news",
    其它报告: "report-other"
  }
];

export type IattackInfo = {
  attack_name: string;
  describe: string;
  attack_step: string[];
  img_show_style: string;
  application: string;
  advantage: string[];
  disadvantage: string[];
};

export const trustDocument: IattackInfo[] = [
  {
    attack_name: `Optim（optimization-based
        attacks）`,
    describe: `这种攻击方法基于优化算法，通过调整原始输入的像素值，使得模型在这些调整后的输入上产生错误的输出。优化的目标通常是最大化损失函数，使得模型误分类。`,
    attack_step: [
      `初始化： 从原始输入开始，生成初始对抗样本。`,
      `迭代优化： 使用梯度信息迭代地调整对抗样本，引入动量来加速收敛。`,
      `停止条件： 攻击者可以设置停止优化的条件，例如达到一定的迭代次数或达到足够的误导效果。`,
      `生成对抗样本： 最终得到的调整后的输入被认为是对抗样本。`
    ],
    img_show_style: `可以通过图示显示原始输入图像和最终生成的对抗样本之间的差异，例如通过对比两者的像素值或可视化差异的热图`,
    application: `这种攻击方法常用于评估深度学习模型的鲁棒性，也推动了对模型防御机制的研究和改进。`,
    advantage: [
      `强大的攻击性能： 通过优化过程，生成的对抗样本通常能够有效地欺骗深度学习模型。`,
      `灵活性： 可以根据具体情况调整优化的目标函数，适应不同攻击场景。`
    ],
    disadvantage: [
      `计算成本高： 优化过程可能需要较长时间和大量计算资源。`,
      `难以解释： 生成的对抗样本可能难以解释，不容易理解人类感知上的变化。`
    ]
  },
  {
    attack_name: `Momentum Iterative Method (Mim)`,
    describe: `Mim是一种基于梯度的迭代对抗攻击方法，其核心思想是通过迭代地调整原始输入，使用梯度信息引导调整方向，并引入动量来提高攻击的效果`,
    attack_step: [
      `初始化： 从原始输入开始，生成初始对抗样本。`,
      `迭代优化： 使用梯度信息迭代地调整对抗样本，引入动量来加速收敛。`,
      `停止条件： 攻击者可以设置停止优化的条件，例如达到一定的迭代次数或达到足够的误导效果。`,
      `生成对抗样本： 最终得到的调整后的输入被认为是对抗样本。`
    ],
    img_show_style: `可以通过图示显示原始输入图像和最终生成的对抗样本之间的演变，以及梯度和动量的影响。此外，可以使用热图或其他可视化手段来强调调整的像素。`,
    application: `Mim方法常用于评估深度学习模型的鲁棒性，尤其是在考虑到梯度信息和动量的情况下，模型对抗攻击的性能和防御机制得到了更全面的评估。`,
    advantage: [
      `较强的攻击性能： 引入动量可以加速攻击的收敛，生成更具欺骗性的对抗样本。`,
      `渐进调整： 通过迭代调整，可以逐渐微调对抗样本，增加欺骗性。`
    ],
    disadvantage: [
      `计算成本相对高： 与一步的攻击方法相比，Mim通常需要更多的计算资源。`,
      `仍需较多计算资源： 相较于一些快速攻击方法，Mim需要更多的计算资源。`
    ]
  },
  {
    attack_name: `Basic Iterative Method (Bim)`,
    describe: `  Bim是一种基于迭代的对抗攻击方法，其目标是通过对原始输入进行多轮迭代调整，生成对抗样本，使得模型在对抗样本上产生错误的输出。`,
    attack_step: [
      `初始化： 从原始输入开始，生成初始对抗样本。`,
      `多轮迭代： 对对抗样本进行多轮迭代，每一轮都微调像素值以最大程度地欺骗模型。`,
      `每轮步幅控制： 在每一轮中，Bim使用较小的 epsilon（扰动的幅度），相对于Mim，这使得每一轮的微调更为谨慎。`,
      `停止条件： 攻击者可以设置停止迭代的条件，例如达到一定的迭代次数或达到足够的误导效果。`,
      `生成对抗样本： 最终得到的调整后的输入被认为是对抗样本。`
    ],
    img_show_style: `可以通过图示显示每轮迭代对原始输入图像的微调，以及最终生成的对抗样本。这有助于理解Bim的渐进性调整过程。`,
    application: `Bim常用于评估深度学习模型的鲁棒性，特别是在生成对抗样本时使用相对较小的 epsilon 进行微调的情况下。`,
    advantage: [
      `较为谨慎的微调： 相对于Mim，Bim在每一轮迭代中使用较小的 epsilon，生成的对抗样本更接近原始图像。`
    ],
    disadvantage: [
      `相对慢收敛： 由于每轮微调较小，收敛速度相对较慢。`,
      `可能容易受制于防御策略： 对抗样本与原始图像相似度较高，可能更容易受到防御策略的限制。`
    ]
  },
  {
    attack_name: `Projected Gradient Descent (PGD)`,
    describe: `PGD基于梯度下降法，通过迭代地调整原始输入，利用模型的梯度信息来生成对抗样本。与其他迭代攻击方法不同，PGD引入了投影操作，以确保生成的对抗样本仍然接近原始数据分布。`,
    attack_step: [
      `初始化： 从原始输入开始，生成初始对抗样本。`,
      `迭代优化： 使用梯度信息迭代地调整对抗样本，类似于标准的梯度下降法。然而，PGD在每一步都应用了投影操作，确保对抗样本不会离开原始数据分布。`,
      `停止条件： 攻击者可以设置停止优化的条件，例如达到一定的迭代次数或达到足够的误导效果。`,
      `生成对抗样本： 最终得到的调整后的输入被认为是对抗样本。`
    ],
    img_show_style: `可以通过图示显示每轮迭代对原始输入图像的微调，以及投影操作如何确保对抗样本保持在实际数据分布内。`,
    application: `PGD常用于评估深度学习模型的鲁棒性，因为它对模型的攻击更为具有挑战性，对抗样本的生成更接近实际数据分布。`,
    advantage: [
      `更强大的攻击性能： PGD通常具有更强的攻击性能，能够生成更具欺骗性的对抗样本。`,
      `投影操作提高鲁棒性： 引入投影操作确保对抗样本仍然接近原始数据分布，提高了对抗样本的鲁棒性。`
    ],
    disadvantage: [
      `计算成本高： PGD通常需要更多的计算资源和时间，相较于一些快速攻击方法。`,
      `可能更难防御： 由于更强大的攻击性能，PGD生成的对抗样本可能更难以防御。`
    ]
  }
];

export type noisePar = {
  name: string;
  min: number;
  max: number;
  curIndex: number;

  step: number;
  defaultValue: number;
};

export type noiseTableType = {
  title: string;
  parNum: number;
  par: noisePar[];
  log: string;
};

export const noiseTableData: noiseTableType[] = [
  {
    title: "散粒噪声",
    parNum: 2,
    par: [
      {
        name: "电流大小I(A)",
        min: 0,
        max: 10,
        step: 1,
        curIndex: 0,
        defaultValue: 40
      },
      {
        name: "带宽f1(kHz)",
        min: 0,
        max: 10,
        curIndex: 1,
        step: 1,
        defaultValue: 60
      }
    ],
    log: "散粒噪声是晶体管中少数载流子数目和速度起伏导致结电流的微小变化引起的\nN1=2*q*I*f1\nq是一个电子的电荷, I是流经节点的电流"
  },
  {
    title: "光子散粒噪声",
    parNum: 2,
    par: [
      {
        name: "光照时间t(ms)",
        min: 0,
        max: 999,
        step: 10,
        curIndex: 2,
        defaultValue: 30
      },
      {
        name: "光粒子数n(M)",
        min: 0,
        max: 999,
        curIndex: 3,
        step: 10,
        defaultValue: 50
      }
    ],
    log: "光子散粒噪声是光电二极管内的光子数量变动引起的\nN2=n*t*e^(-n*t)\nt为光照时间, n为在t秒内的光粒子数"
  },
  {
    title: "热噪声",
    parNum: 3,
    par: [
      {
        name: "温度T(K)",
        min: 250,
        max: 400,
        step: 10,
        curIndex: 4,
        defaultValue: 70
      },
      {
        name: "电阻R(kΩ)",
        min: 0,
        max: 10,
        step: 1,
        curIndex: 5,
        defaultValue: 41
      },
      {
        name: "带宽f2(kHz)",
        min: 0,
        max: 10,
        step: 1,
        curIndex: 6,
        defaultValue: 100
      }
    ],
    log: "热噪声存在于所有电子器件和传输介质中, 由于带电粒子热骚动而产生的\nN3=4*K*T*f2/R\nK是玻尔兹曼常数, T为绝对温度, R是电阻"
  },
  {
    title: "量化噪声",
    parNum: 1,
    par: [
      {
        name: "最小量化单位q",
        min: 0,
        max: 1,
        step: 0.1,
        curIndex: 7,
        defaultValue: 40
      }
    ],
    log: "q为最低有效位可表示的最小单位"
  },
  {
    title: "系统增益",
    parNum: 2,
    par: [
      {
        name: "K1",
        min: 0,
        max: 100,
        step: 10,
        curIndex: 8,
        defaultValue: 90
      },
      {
        name: "K2",
        min: 0,
        max: 100,
        step: 10,
        curIndex: 9,
        defaultValue: 60
      }
    ],
    log: "K1为系统的内增益, K2为系统的全增益"
  }
];

type noiseLimitType = {
  [key: string]: noisePar;
};

export const noiseDataLimit: noiseLimitType = {
  current: {
    min: 0,
    max: 10,
    step: 0.2,
    defaultValue: 1,
    curIndex: 0,
    name: "电流大小I(A)"
  },
  bandwidth: {
    min: 0,
    max: 10,
    step: 0.2,
    defaultValue: 1,
    curIndex: 1,
    name: "带宽f1(kHz)"
  },
  exposureTime: {
    min: 0,
    max: 1000,
    step: 20,
    defaultValue: 100,
    name: "光照时间t(ms)",
    curIndex: 2
  },
  photonCount: {
    min: 0,
    max: 10000,
    step: 100,
    defaultValue: 1000,
    name: "光粒子数n(M)",
    curIndex: 3
  },
  temperature: {
    min: 0,
    max: 1000,
    step: 20,
    defaultValue: 300,
    name: "光照时间t(ms)",
    curIndex: 4
  },
  resistance: {
    min: 0,
    max: 10,
    step: 0.5,
    defaultValue: 1,
    name: "电阻R(kΩ)",
    curIndex: 5
  },
  tbandwidth: {
    min: 0,
    max: 10,
    step: 0.2,
    defaultValue: 1,
    name: "带宽f2(kHz)",
    curIndex: 6
  },
  mqUnit: {
    min: 0,
    max: 0.1,
    step: 0.001,
    defaultValue: 0.01,
    name: "最小量化单位q",
    curIndex: 7
  },
  gainK1: {
    min: 0,
    max: 1000,
    step: 10,
    defaultValue: 50,
    name: "增益K1",
    curIndex: 8
  },
  gainK2: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 10,
    name: "增益K2",
    curIndex: 9
  }
};

export const NoiseArray = [
  "current",
  "bandwidth",
  "exposureTime",
  "photonCount",
  "temperature",
  "resistance",
  "tbandwidth",
  "mqUnit",
  "gainK1",
  "gainK2"
];

// export const noiseToCh: { [key: string]: string } = {
//   current: "电流I(A)",
//   bandwidth: "带宽f1(kHz)",
//   exposureTime: "光照时间t(ms)",
//   photonCount: "光粒子数n(M)",
//   temperature: "温度T(K)",
//   resistance: "电阻R(kΩ)",
//   tbandwidth: "带宽f2(kHz)",
//   mqUnit: "最小量化单位q",
//   gainK1: "增益K1",
//   gainK2: "增益K2"
// };

export type noiceDefaultType = {
  para_name: string;
  intensity: number;
};
export const noiceDefault1: Iwork = {
  current: {
    weight: 0,
    intensity: 1
  },
  bandwidth: {
    weight: 0,
    intensity: 10
  },

  temperature: {
    weight: 0,
    intensity: 300
  },
  resistance: {
    weight: 0,
    intensity: 1
  },
  tbandwidth: {
    weight: 0,
    intensity: 1
  }
};

export const noiceDefault2: Iwork = {
  exposureTime: {
    weight: 0,
    intensity: 100
  },
  photonCount: {
    weight: 0,
    intensity: 1000
  },

  mqUnit: {
    weight: 0,
    intensity: 0.01
  },
  gainK1: {
    weight: 0,
    intensity: 50
  },
  gainK2: {
    weight: 0,
    intensity: 10
  }
};

export const NoiseNum: { [key: string]: number } = {
  "电流大小I(A)": 0,
  "带宽f1(kHz)": 1,
  "光照时间t(ms)": 2,
  "光粒子数n(M)": 3,
  "温度T(K)": 4,
  "电阻R(kΩ)": 5,
  "带宽f2(kHz)": 6,
  最小量化单位q: 7,
  K1: 8,
  K2: 9
};

export const NoiseDescribe: { [key: string]: string } = {
  "电流I(A)":
    "散粒噪声的电流，与噪声大小成正比，会导致图像细节变得模糊，降低图像对比度",
  "带宽f1(kHz)": "散粒噪声的带宽，与噪声大小成正比，会导致图像细节变得模糊",
  "光照时间t(ms)":
    "光子散粒噪声的光照时间，与噪声大小成正比，图像中的亮度和颜色会随机变化",
  "光粒子数n(M)":
    "光子散粒噪声的光粒子数，与噪声大小成正比，图像中的亮度和颜色会随机变化",
  "温度T(K)":
    "热噪声的温度，与噪声大小成正比，导致图像细节变得模糊，降低图像对比度",
  "电阻R(kΩ)": "热噪声的电阻，与噪声大小成反比，会导致图像细节变得模糊",
  "带宽f2(kHz)":
    "热噪声的带宽，与噪声大小成正比，导致图像细节变得模糊，降低图像对比度",
  最小量化单位q: "量化噪声最小的量化单位，会降低图像的对比度",
  增益K1: "系统内增益",
  增益K2: "系统全增益"
};

export const res_EnName = [
  "basic_effectiveness",
  "adaptablity",
  "dependability",
  "multiband",
  "abstract",
  "selflearn"
];

export const res_measurement = [
  "基础效能",
  "可适应能力",
  "可信赖能力",
  "多波段协同能力",
  "抽象感知能力",
  "自学习能力"
];
