import React, { memo, useCallback, useState } from "react";
import type { FC, ReactNode } from "react";
import { AnnotationWrap } from "./style";
import Menu from "./c-cpns/Menu";
import { rules_Data } from "@/assets/data/local_data";
import RuleItem from "./c-cpns/RuleItem";

interface Iprops {
  children?: ReactNode;
}

const Annotation: FC<Iprops> = (props) => {
  const [category, setCategory] = useState("policy-china");

  const alinkHandle = useCallback(
    (curCategory: string) => {
      setCategory(curCategory);
    },
    [category]
  );
  return (
    <AnnotationWrap>
      <div className="annaotaion_body">
        <Menu btnClickHandle={alinkHandle} curCate={category} />
        {rules_Data.map(
          (item) =>
            category == item.category && (
              <div className="rule_item" key={item.title}>
                <a href={item.website} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
                <p>时间：{item.time}</p>
                <p>国家：{item.country}</p>
                <p>应用场景：{item.scenario}</p>
                <p>发布方：{item.publisher}</p>
                <p>简介：{item.introduction}</p>
              </div>
            )
        )}
      </div>
    </AnnotationWrap>
  );
};

export default memo(Annotation);
