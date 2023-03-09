import React, { memo } from "react";
import type { FC, ReactNode } from "react";

import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { CoverWrap } from "./style";

interface Iprops {
  children?: ReactNode;
  width: number;
  btnClickHandle: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const AppCover: FC<Iprops> = (props) => {
  const { width, btnClickHandle } = props;
  return (
    <CoverWrap width={width}>
      <div className="cover-content">
        {props.children}
        <Button
          type="primary"
          icon={<CloseOutlined />}
          className="close_cover"
          onClick={btnClickHandle}
        />
      </div>
    </CoverWrap>
  );
};

export default memo(AppCover);
