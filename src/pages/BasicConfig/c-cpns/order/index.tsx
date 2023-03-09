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
  regTest?: string;
}

const Order: FC<Iprops> = (props) => {
  const { title, isSecene, isCommand, regTest, children } = props;
  const { scene } = useAppSelector(
    (state) => ({
      scene: state.basicConfig.scene
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
        regTest ? (
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
