import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { SideWrap } from "./style";
import Sider from "antd/es/layout/Sider";
import { Menu, MenuProps } from "antd";
import { getItem } from "@/utils/getItem";
import { sideNav } from "@/assets/data/local_data";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeNextPathAction } from "@/pages/BasicConfig/store";

interface Iprops {
  children?: ReactNode;
}

type MenuItem = Required<MenuProps>["items"][number];

const AppSide: FC<Iprops> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { nextPath, sceneNum } = useAppSelector((state) => ({
    nextPath: state.basicConfig.nextPath,
    sceneNum: state.basicConfig.sceneNum
  }));

  function linkBtnHandle(e: any) {
    dispatch(changeNextPathAction(e.key));
    console.log(e.key);
    navigate(e.key);
  }

  const items: MenuItem[] = sideNav.map((item) => {
    // return getItem(item.title, item.link, item.icon, item.sub);
    return getItem(item.title, item.link, item.icon);
  });

  return (
    <SideWrap>
      <Sider width={"100%"}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["/config"]}
          //   defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={items}
          onClick={(e) => linkBtnHandle(e)}
          selectedKeys={[nextPath]}
        />
      </Sider>
    </SideWrap>
  );
};

export default memo(AppSide);
