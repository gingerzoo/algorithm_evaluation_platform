import React, { memo, useCallback, useState } from "react";
import type { FC, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { LoginWrap } from "./style";
import { Modal } from "antd";
import Login_modal from "../login_modal";
import Register from "../Register";
import { changeUserNameAction } from "@/pages/BasicConfig/store";

interface Iprops {
  children?: ReactNode;
}

const Login: FC<Iprops> = (props) => {
  const { user_name } = useAppSelector((state) => ({
    user_name: state.basicConfig.user_name
  }));
  const [IsLogin, setIsLogin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegiModalOpen, setIsRegiModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const loginClick = () => {
    setIsLogin(!IsLogin);
    setIsLoginModalOpen(true);
  };

  const handleLoginOk = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginCancel = () => {
    setIsLoginModalOpen(false);
  };

  const handleReigiOk = () => {
    setIsRegiModalOpen(false);
  };
  const handleRegiCancel = () => {
    setIsRegiModalOpen(false);
  };

  const registerBtnClick = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsRegiModalOpen(!isRegiModalOpen);
  };

  const logoutClick = () => {
    dispatch(changeUserNameAction(""));
    setIsLoginModalOpen(true);
  };
  const loginedBtn = (
    <div className="user_info common-login">
      <span className="curUserName">{user_name}</span>

      <span className="logout" onClick={logoutClick}>
        退出
      </span>
    </div>
  );

  const notLoginBtn = (
    <div className="login common-login" onClick={loginClick}>
      登录/注册
    </div>
  );

  return (
    <LoginWrap>
      {user_name ? loginedBtn : notLoginBtn}

      <Modal
        centered={true}
        title="帐号登录"
        open={isLoginModalOpen}
        onOk={handleLoginOk}
        onCancel={handleLoginCancel}
        okText="确认"
        cancelText="取消"
      >
        <Login_modal registerHandle={registerBtnClick} />
      </Modal>

      <Modal
        centered={true}
        title="帐号注册"
        open={isRegiModalOpen}
        onOk={handleReigiOk}
        onCancel={handleRegiCancel}
        okText="确认"
        cancelText="取消"
      >
        <Register registerHandle={registerBtnClick} />
      </Modal>
    </LoginWrap>
  );
};

export default memo(Login);
