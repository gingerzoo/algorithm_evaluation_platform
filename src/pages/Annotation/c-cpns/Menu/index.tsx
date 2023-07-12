import React, { Fragment, memo } from "react";
import type { FC, ReactNode } from "react";
import { MenuWrap } from "./style";
import { rules_children, rules_list } from "@/assets/data/local_data";
import classNames from "classnames";

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
            <div className="menu_title">{`${item} >>`}</div>
            {Object.keys(rules_children[index]).map((rule) => {
              const category = rules_children[index][`${rule}`];
              return (
                <div
                  //   className="menu_link"
                  className={classNames("menu_link", {
                    active: category === curCate
                  })}
                  key={rule}
                  onClick={() => {
                    btnClickHandle(category);
                  }}
                >
                  <a>{rule}</a>
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
