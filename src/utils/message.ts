import { message } from "antd";

//校验成功的提示信息
export const successMessage = (info: string) => {
  return message.open({
    type: "success",
    content: info,
    duration: 2
  });
};

//校验失败的提示信息
export const failedMessage = (info: string) => {
  return message.open({
    type: "error",
    content: info,
    duration: 2
  });
};
