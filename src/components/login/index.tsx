import React, { memo, useCallback, useState } from "react";
import type { FC, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { LoginWrap } from "./style";
import { Modal } from "antd";
import Login_modal from "../login_modal";
import Register from "../Register";
import { changeCanLoginAction, changeUserNameAction } from "@/pages/Home/store";
import { useNavigate } from "react-router-dom";
import { getCanLogout } from "@/pages/Home/services";

interface Iprops {
  children?: ReactNode;
}

const Login: FC<Iprops> = (props) => {
  const { user_name } = useAppSelector((state) => ({
    user_name: state.home.user_name
  }));
  const [IsLogin, setIsLogin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegiModalOpen, setIsRegiModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginClick = () => {
    setIsLogin(!IsLogin);
    setIsLoginModalOpen(true);
  };

  const handleLoginOk = () => {
    setIsLoginModalOpen(false);
  };

  //   const handleLoginCancel = () => {
  //     setIsLoginModalOpen(false);
  //   };

  const handleReigiOk = () => {
    setIsRegiModalOpen(false);
  };
  //   const handleRegiCancel = () => {
  //     setIsRegiModalOpen(false);
  //   };

  const registerBtnClick = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsRegiModalOpen(!isRegiModalOpen);
  };

  const logoutClick = () => {
    // dispatch(changeUserNameAction(""));

    dispatch(changeCanLoginAction(false));
    /* 这里要判断一下目前处在在哪个页面！！！！！*/
    getCanLogout();
    navigate(`/home`);
    setIsLoginModalOpen(true);
  };

  const loginedBtn = (
    <div className="user_info common-login">
      <div className="curUserName">{user_name}</div>

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
        onCancel={handleLoginOk}
        // okText="确认"
        // cancelText="取消"
        footer={null}
      >
        <Login_modal
          registerHandle={registerBtnClick}
          loginSucessHandle={handleLoginOk}
        />
      </Modal>

      <Modal
        centered={true}
        title="帐号注册"
        open={isRegiModalOpen}
        onOk={handleReigiOk}
        onCancel={handleReigiOk}
        okText="确认"
        cancelText="取消"
        footer={null}
      >
        <Register registerHandle={registerBtnClick} />
      </Modal>
    </LoginWrap>
  );
};

export default memo(Login);
