import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { DrawerWrap } from "./style";
import { Button, Drawer, Space } from "antd";
import { useAppSelector } from "@/store";
import MyCarousel from "@/components/carousel";

interface Iprops {
  children?: ReactNode;
  title: string;
  sceneNum: number;
  drawerOpen: boolean;
  imgUrls: string[];
  onClose: () => void;
  onLeave: () => void;
  workNum?: number;
}

const MyDrawer: FC<Iprops> = (props) => {
  const { scene } = useAppSelector((state) => ({
    scene: state.basicConfig.scene
  }));
  const { title, drawerOpen, onClose, onLeave, workNum, sceneNum, imgUrls } =
    props;
  return (
    <DrawerWrap>
      <Drawer
        title={title}
        width={scene == "voice" ? "32vw" : "38vw"}
        maskClosable={false}
        mask={false}
        open={drawerOpen}
        onClose={onClose}
        extra={
          <Space>
            <Button type="primary" onClick={onLeave}>
              退出
            </Button>
          </Space>
        }
      >
        <div className="drawer-content">
          <MyCarousel workNum={workNum} sceneNum={sceneNum} imgUrls={imgUrls} />
        </div>
      </Drawer>
    </DrawerWrap>
  );
};

export default memo(MyDrawer);
