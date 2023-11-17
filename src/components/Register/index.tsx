import React, { memo, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { Button, Form, Input, message } from "antd";
import { getCanLogout, getCanRegister } from "@/pages/Home/services";
import { useAppDispatch } from "@/store";
import { changePasswordAction, changeUserNameAction } from "@/pages/Home/store";

interface Iprops {
  children?: ReactNode;
  registerHandle: () => void;
}

type Iregister = {
  nickname: string;
  password: string;
  confirm: string;
};

const Register: FC<Iprops> = (props) => {
  //   const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCanLogout();
    console.log("登出！！");
  }, []);

  const registerNameChange = (e: any) => {
    console.log("register name变了变了", e.target.value);
    dispatch(changeUserNameAction(e.target.value));
  };

  const onFinish = (value: Iregister) => {
    const { nickname: username, password } = { ...value };
    // getCanRegister()
    dispatch(changeUserNameAction(username));
    getCanRegister(username, password).then((res) => {
      console.log("调用注册成功");
      if (res.emsg === "success") {
        console.log("完成注册", username, password);
        console.log(res);
        // dispatch(changeUserNameAction(username));
        dispatch(changePasswordAction(password));

        props.registerHandle();
      } else {
        console.log("注册失败");
        message.error({
          content: res.emsg
        });
      }
    });
  };
  return (
    <Form
      //   {...formItemLayout}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      //   form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      {/* <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: "email",
            message: "输入的邮箱格式无效!"
          },
          {
            required: true,
            message: "请输入邮箱"
          }
        ]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        name="nickname"
        label="用户名"
        // tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "请输入用户名!",
            whitespace: true
          },
          { min: 3, message: "请输入至少三个字符" },
          { max: 10, message: "不要超过十个字符" },
          {
            pattern: new RegExp("^[a-zA-Z]+[0-9a-zA-Z_]+$", "g"),
            message: "用户名只能以字母开头，并由字母数字和下划线组成"
          }
        ]}
      >
        <Input onChange={(e) => registerNameChange(e)} />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "请输入密码!"
          },
          { min: 6, message: "请输入至少六个字符" }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "请确认密码!"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("该密码和初始输入的密码不匹配!"));
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", marginTop: "12px" }}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(Register);
