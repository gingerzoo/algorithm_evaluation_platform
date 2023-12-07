import React, { memo, Suspense, useCallback, useState } from "react";
import type { FC, ReactNode } from "react";
import { ProfileWrap } from "./style";
import AppHeader from "@/components/app_header";

import Header_process from "@/components/header_process";

import AppSide from "@/components/app_side";
import { Outlet } from "react-router-dom";
import App_cover from "@/components/app_cover";
import Green_hand from "@/components/green_hand";
import { useAppSelector } from "@/store";

interface Iprops {
  children?: ReactNode;
}

const Peofile: FC<Iprops> = (props) => {
  const [isGreen, setIsGreen] = useState(false);
  const greenBtnHandle = useCallback(() => {
    setIsGreen(!isGreen);
    console.log("我被点了");
  }, [isGreen]);
  return (
    <ProfileWrap isGreen={isGreen}>
      <AppHeader greenClickHandle={greenBtnHandle} />
      <Header_process />
      <div className="main">
        <AppSide />
        <Suspense>
          <div className="content">
            <Outlet />
            {/* <div className="cover green-hand">
              <App_cover
                btnClickHandle={greenBtnHandle}
                width={800}
                isRemote={sceneNum == 2}
              >
                <Green_hand />
              </App_cover>
            </div> */}
          </div>
        </Suspense>
      </div>
    </ProfileWrap>
  );
};

export default memo(Peofile);
