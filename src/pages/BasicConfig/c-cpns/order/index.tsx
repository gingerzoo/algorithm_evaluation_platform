import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { OrderWrap } from "./style";
import { CheckCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/store";
import { shallowEqual } from "react-redux";

interface Iprops {
  children?: ReactNode;
  title: string;
  isSecene?: boolean;
  isCommand?: boolean;
  //   inputPlace?: boolean;
}

const Order: FC<Iprops> = (props) => {
  const { title, isSecene, isCommand, children } = props;
  const { scene, inputRun } = useAppSelector(
    (state) => ({
      scene: state.basicConfig.scene,
      inputRun: state.basicConfig.inputRun
    }),
    shallowEqual
  );

  return (
    <OrderWrap>
      <span className="title">{title}</span>
      {/* <Input
        type="text"
        placeholder={`docker run --rm --ipc=host --net testenv python infer.py`}
      /> */}
      {children}

      {isSecene ? (
        scene ? (
          <CheckCircleOutlined style={{ fontSize: "22px", color: "#79CC86" }} />
        ) : (
          <QuestionCircleOutlined
            style={{ fontSize: "22px", color: "#B3B3B3" }}
          />
        )
      ) : (
        ""
      )}

      {isCommand ? (
        inputRun ? (
          <CheckCircleOutlined style={{ fontSize: "22px", color: "#79CC86" }} />
        ) : (
          <QuestionCircleOutlined
            style={{ fontSize: "22px", color: "#B3B3B3" }}
          />
        )
      ) : (
        ""
      )}
    </OrderWrap>
  );
};

export default memo(Order);
