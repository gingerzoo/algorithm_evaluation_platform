import React, { memo, useCallback, useState } from "react";
import type { FC, ReactNode } from "react";
import { AnnotationWrap } from "./style";
import Menu from "./c-cpns/Menu";
import { rules_Data } from "@/assets/data/local_data";
import Menu_item from "./c-cpns/menu_item";
import { useNavigate } from "react-router-dom";

interface Iprops {
  children?: ReactNode;
}

const Annotation: FC<Iprops> = (props) => {
  const [category, setCategory] = useState("policy-china");
  const navigate = useNavigate();

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
              <Menu_item info={item} key={item.title} />
            )
        )}
      </div>
      <button
        className="back_home"
        onClick={() => {
          navigate("/home");
        }}
      >
        <span>返回首页</span>
      </button>
    </AnnotationWrap>
  );
};

export default memo(Annotation);
