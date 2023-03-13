import React, { memo, useRef } from "react";
import type { FC, ReactNode } from "react";
import { UploadWrap } from "./style";
import { SwitcherFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeIsAsureAction, getSystemAction } from "../../store";

interface Iprops {
  children?: ReactNode;
  commandClickHandle: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
}

const DockerUpload: FC<Iprops> = (props) => {
  const { commandClickHandle } = props;

  const { system_status, system_scene, docker_name } = useAppSelector(
    (state) => ({
      system_status: state.basicConfig.system.status,
      system_scene: state.basicConfig.system.scene,
      docker_name: state.basicConfig.dataName
    })
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  function btnClickHandle(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    // console.log(browse, "让我看看谁被点了");
    commandClickHandle(e);
  }

  function inputHandleClick() {
    if (inputRef.current?.files) {
      const file = inputRef.current.files[0];
      //   (document.getElementById("commandInput") as any).value = "";
      //   console.log((document.getElementById("commandInput") as any).value);

      dispatch(getSystemAction(file.name));
      dispatch(changeIsAsureAction(false));
    }
  }

  return (
    <UploadWrap>
      <div className="big-box">
        <span className="icon">
          <SwitcherFilled style={{ fontSize: "22px", color: "#0077FA" }} />
        </span>
        <p className="title">
          {system_status == 0 ? "docker包加载成功" : "加载docker镜像包"}
        </p>
        <p className="file-type">
          {system_status == -1
            ? "支持的文件类型:docker"
            : system_status == 0
            ? `${docker_name}`
            : "加载失败,请检查docker包格式是否正确"}
        </p>
        <input
          type="file"
          className="docker"
          ref={inputRef}
          onInput={inputHandleClick}
        />
      </div>
      <span className="command" onClick={(e) => btnClickHandle(e)}>
        查看系统简况
      </span>
    </UploadWrap>
  );
};

export default memo(DockerUpload);
