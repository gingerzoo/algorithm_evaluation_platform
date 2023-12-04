import React, { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import LibraryItem from "@/components/libraryItem/index";
import { LibraryMapWrap } from "./style";

interface Iprops {
  children?: ReactNode;
  curIndex: number;
}
const LibraryMap: FC<Iprops> = ({ curIndex }) => {
  const rule_Data = [
    {
      category: "policy-foreign",
      title: "人工智能伦理问题建议书",
      website: "https://unesdoc.unesco.org/ark:/48223/pf0000380455_chi",
      time: 2021.11,
      country: "联合国",
      scenario: "规范",
      publisher: "联合国",
      introduction:
        "联合国教科文组织于2021年11月通过了《人工智能伦理问题建议书》,这是首个关于以符合伦理要求的方式运用人工智能的全球框架。"
    },
    {
      category: "policy-foreign",
      title: "Transparency and Trust in the Cognitive Era",
      website:
        "https://www.ibm.com/blogs/think/2017/01/ibm-cognitive-principles/",
      time: 2017.01,
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
      time: 2021.09,
      country: "中国",
      scenario: "安全",
      publisher: "中华人民共和国科技部",
      introduction:
        "国家新一代人工智能治理专业委员会发布了《新一代人工智能伦理规范》(以下简称《伦理规范》)，旨在将伦理道德融入人工智能全生命周期，为从事人工智能相关活动的自然人、法人和其他相关机构等提供伦理指引。"
    }
  ];

  const standard_Data = [
    {
      category: "policy-china",
      title: "深圳经济特区人工智能产业促进条例",
      website:
        "http://www.szrd.gov.cn/szrd_zlda/szrd_zlda_flfg/flfg_szfg/content/post_834707.html",
      time: 2022.9,
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
      time: 2020.05,
      country: "中国",
      scenario: "法律",
      publisher: "十三届全国人大三次会议",
      introduction:
        "《中华人民共和国民法典》被称为“社会生活的百科全书”，是新中国第一部以法典命名的法律，在法律体系中居于基础性地位，也是市场经济的基本法。"
    }
  ];

  //   const currentPath = useLocation().pathname;
  let ruleItemData = null;
  if (curIndex === 0) {
    ruleItemData = rule_Data.concat(standard_Data);
  } else if (curIndex === 1) {
    ruleItemData = standard_Data;
  }

  return (
    <LibraryMapWrap>
      <div className="library_content">
        {ruleItemData?.map((item, index) => {
          return (
            <LibraryItem
              key={index}
              title={item.title}
              website={item.website}
              time={item.time}
              publisher={item.publisher}
            />
          );
        })}
      </div>
    </LibraryMapWrap>
  );
};

export default LibraryMap;
