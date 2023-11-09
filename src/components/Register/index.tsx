import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { Button, Form, Input } from "antd";
import form from "antd/es/form";

interface Iprops {
  children?: ReactNode;
  registerHandle: () => void;
}

const Register: FC<Iprops> = (props) => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const onReigisterFinish = (value: any) => {
    console.log("完成注册", value);
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={props.registerHandle}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
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
      </Form.Item>
      <Form.Item
        name="nickname"
        label="用户名"
        // tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "请输入用户名!",
            whitespace: true
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "请输入密码!"
          }
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

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(Register);
