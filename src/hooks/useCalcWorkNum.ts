import { useAppSelector } from "@/store";
export default function useCalcWorkNum() {
  const { checkList, sceneNum } = useAppSelector((state) => ({
    checkList: state.adaptAbili.checkList,
    sceneNum: state.basicConfig.sceneNum
  }));

  //   const [messageApi, contextHolder] = message.useMessage();

  //   const info = () => {
  //     messageApi.info("Hello, Ant Design!");
  //   };
  console.log("checkList", checkList);
  const resName: string[] = [];
  checkList[sceneNum].forEach((item, index) => {
    if (item) {
      resName.push(`工况${index + 1}`);
    }
  });

  return resName;
}
