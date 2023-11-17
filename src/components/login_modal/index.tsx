import React, { memo, useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { Button, Checkbox, Form, Input, InputRef, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginModalWrap } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeCanLoginAction,
  changePasswordAction,
  changeRememberAction,
  changeUserNameAction
} from "@/pages/Home/store";

import { getCanLogin, getCanLogout } from "@/pages/Home/services";

interface Iprops {
  children?: ReactNode;
  registerHandle: () => void;
  loginSucessHandle: () => void;
}

type IuserInfo = {
  username: string;
  password: string;
  remember: boolean;
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const LoginModal: FC<Iprops> = (props) => {
  const { user_name, password } = useAppSelector((state) => ({
    user_name: state.home.user_name,
    password: state.home.password
  }));
  const [nameValue, setNameValue] = useState("yangpeng");
  const [passwordValue, setPasswordValue] = useState("yangpeng");
  useEffect(() => {
    console.log("login页面重新渲染");
    if (nameRef.current) {
      console.log("现在input的value值", nameRef.current.input);
    }

    // setNameValue(user_name);
    // setPasswordValue(password);
  });

  const nameRef = useRef<InputRef>(null);
  const dispatch = useAppDispatch();

  const onFinish = (values: IuserInfo) => {
    const { username, password, remember } = values;
    console.log("login,login", values);

    try {
      getCanLogin(username, password).then((res) => {
        console.log("调用登录接口成功！", res);
        if (res.emsg === "success") {
          dispatch(changeUserNameAction(values.username));
          dispatch(changeCanLoginAction(true));
          if (remember) {
            dispatch(changeRememberAction(true));
            dispatch(changePasswordAction(password));
          } else {
            dispatch(changeRememberAction(false));
          }
          props.loginSucessHandle();
        } else {
          message.error({
            content: res.emsg
          });
        }
      });
    } catch (err: any) {
      console.log("接口不可以调用");
      message.open({
        type: "error",
        content: "网络错误",
        duration: 2
      });
    }
  };

  //   const formItemLayout = {
  //     labelCol: {
  //       xs: { span: 24 },
  //       sm: { span: 8 }
  //     },
  //     wrapperCol: {
  //       xs: { span: 24 },
  //       sm: { span: 16 }
  //     }
  //   };

  const usernameChangeHandle = (e: any) => {
    console.log("input框在变化", e.target.value);
    // setNameValue(e.target.value);
    dispatch(changeUserNameAction(e.target.value));
  };

  const passwordChangeHandle = (e: any) => {
    console.log("input框在变化", e.target.value);
    dispatch(changePasswordAction(e.target.value));
  };

  return (
    <LoginModalWrap>
      <Form
        name="normal_login"
        className="login-form"
        // {...formItemLayout}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          remember: true,
          username: user_name,
          password
        }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          name="username"
          label="用户名"
          rules={[
            { required: true, message: "Please input your Username!" },
            { min: 3, message: "请输入至少三个字符" },
            { max: 10, message: "不要超过十个字符" },
            {
              pattern: new RegExp("^[a-zA-Z]+[0-9a-zA-Z_]+$", "g"),
              message: "用户名只能以字母开头，并由字母数字和下划线组成"
            }
          ]}
          //   validateStatus="error"
          validateTrigger="onChange"

          //   help="用户不存在"
        >
          <Input
            ref={nameRef}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
            value={nameValue}
            onChange={(e) => {
              usernameChangeHandle(e);
            }}
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="password"
          label="密码"
          rules={[
            { required: true, message: "Please input your Password!" },
            { min: 6, message: "请输入至少六个字符" }
            // {
            //   pattern: new RegExp(
            //     "(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-z0-9]{6,15}"
            //   ),
            //   message: "密码必须包含至少一个字母,一个数字和一个特殊字符"
            // }
          ]}
          validateTrigger="onChange"
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入密码"
            value={passwordValue}
            onBlur={(e) => {
              passwordChangeHandle(e);
            }}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 5, span: 16 }}
        >
          <Checkbox>记住密码</Checkbox>

          {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          <a
            className="supplement"
            style={{ color: "#777", marginLeft: "5px" }}
            onClick={props.registerHandle}
          >
            没有帐号?立刻注册！
          </a>
        </Form.Item>
      </Form>
    </LoginModalWrap>
  );
};

export default memo(LoginModal);
