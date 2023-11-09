import { useAppSelector } from "@/store";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function useCanLogin() {
  const { canLogin } = useAppSelector((state) => ({
    canLogin: state.basicConfig.canLogin
  }));
  const navigate = useNavigate();
  //   const [messageApi, contextHolder] = message.useMessage();

  //   const info = () => {
  //     messageApi.info("Hello, Ant Design!");
  //   };

  return (path: string) => {
    if (!canLogin) {
      message.open({
        type: "error",
        content: "请先登录！"
      });
    } else {
      navigate(path);
    }
  };
}
