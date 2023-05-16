import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { useAppSelector } from "@/store";
import { TypewriterWrap } from "./style";

interface Iprops {
  children?: ReactNode;
}

const Typeweriter: FC<Iprops> = (props) => {
  const { isPending } = useAppSelector((state) => ({
    isPending: state.basicEffect.isPending
  }));
  const text =
    "整体分为两个阶段。第一个阶段为计算基础效能。首先要有基本指标，该基本指标为基础效能，即无干扰情况下的准确率，或者存在多个评价准则，最后加权得到的基础效能分数。第二阶段计算加入干扰信号后的准确率，再由干扰情况和计算结果分别给出可依赖性和可适应能力情况。";

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isPending) {
      const timer = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
          //滚动到页面底部
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
          });
        } else {
          clearInterval(timer);
        }
      }, 200);

      return () => {
        clearInterval(timer);
      };
    }

    //依赖哪些状态记得把它们统统加入这个依赖项里
  }, [isPending, currentIndex]);

  return <TypewriterWrap isPending={isPending}>{displayText}</TypewriterWrap>;
};

export default memo(Typeweriter);
