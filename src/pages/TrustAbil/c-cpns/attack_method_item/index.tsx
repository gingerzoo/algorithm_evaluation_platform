import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { IattackInfo } from "@/assets/data/local_data";
import { AttackItemWrap } from "./style";

interface Iprops {
  children?: ReactNode;
  item_info: IattackInfo;
}

const AttackMethodItem: FC<Iprops> = (props) => {
  const {
    attack_name,
    describe,
    attack_step,
    img_show_style,
    application,
    advantage,
    disadvantage
  } = props.item_info;
  return (
    <AttackItemWrap>
      <h3 className="attack-name">{attack_name}</h3>
      <h4 className="principle">***基本原理***</h4>
      <p className="describe">{describe}</p>
      <h4>***攻击步骤***</h4>
      <ul className="ulSquare step">
        {attack_step.map((item, index) => {
          return <li key={index} className="attack-step">{` ${item}`}</li>;
        })}
      </ul>
      <h4>***图示方式***</h4>
      <p>{img_show_style}</p>
      <h4>***实际应用***</h4>
      <p>{application}</p>
      <h4>***优点***</h4>
      <ul className="ulSquare advantage">
        {advantage.map((item, index) => {
          return (
            <li key={index} className="list-item advantage">{`${item}`}</li>
          );
        })}
      </ul>
      <h4>***缺点***</h4>
      <ul className="ulSquare disadvantage">
        {disadvantage.map((item, index) => {
          return (
            <li key={index} className="list-item disadvantage">{`${item}`}</li>
          );
        })}
      </ul>
    </AttackItemWrap>
  );
};

export default memo(AttackMethodItem);
