import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginModalWrap } from "./style";
import { useAppDispatch } from "@/store";
import {
  changeCanLoginAction,
  changeUserNameAction
} from "@/pages/BasicConfig/store";

interface Iprops {
  children?: ReactNode;
  registerHandle: () => void;
}

const LoginModal: FC<Iprops> = (props) => {
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    /* 这里应当有个登录接口的调用 如果成功则将用户名存入store中*/
    dispatch(changeUserNameAction(values.username));
    dispatch(changeCanLoginAction(true));
    console.log("表单数据", values);
  };

  return (
    <LoginModalWrap>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
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
          validateTrigger="onBlur"

          //   help="用户不存在"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
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
          validateTrigger="onBlur"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
        </Form.Item>

        <Form.Item>
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
