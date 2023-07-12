import React, { Fragment, memo } from "react";
import type { FC, ReactNode } from "react";
import Navi from "../Navi";
import { MenuWrap } from "./style";
import { rules_children, rules_list } from "@/assets/data/local_data";

interface Iprops {
  children?: ReactNode;
  btnClickHandle: (curCategory: string) => void;
  curCate: string;
}

const Menu: FC<Iprops> = ({ btnClickHandle, curCate }) => {
  return (
    <MenuWrap>
      {rules_list.map((item, index) => {
        return (
          <div className="menu" key={item}>
            <div className="menu_title">{item}</div>
            {Object.keys(rules_children[index]).map((rule) => {
              return (
                <div className="link" key={rule}>
                  <Navi
                    category={rules_children[index][`${rule}`]}
                    context={rule}
                    btnClickHandle={btnClickHandle}
                    curCate={curCate}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </MenuWrap>
  );
};

export default memo(Menu);
