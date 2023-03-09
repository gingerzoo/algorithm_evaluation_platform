import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { Menu, MenuProps } from "antd";
import { headerNav } from "@/assets/data/local_data";
import { MenuWrap } from "./style";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { changeNextPathAction } from "@/pages/BasicConfig/store";

interface Iprops {
  children?: ReactNode;
}

const MenuHead: FC<Iprops> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //头部导航
  const items: MenuProps["items"] = headerNav.map((item) => ({
    key: `${item.link}`,
    label: `${item.title}`
  }));

  function menuBtnClick(e: any) {
    navigate(e.key);
    dispatch(changeNextPathAction(e.key));
  }

  return (
    <MenuWrap>
      <MenuOutlined style={{ fontSize: "22px", color: "white" }} />
      <Menu
        style={{ background: "#447ED9" }}
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        onClick={(e) => menuBtnClick(e)}
      />
    </MenuWrap>
  );
};

export default memo(MenuHead);
