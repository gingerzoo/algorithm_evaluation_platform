import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { OverviewWrap } from "./style";
import { useAppSelector } from "@/store";
import { subs } from "@/assets/data/local_data";

interface Iprops {
  children?: ReactNode;
}

const SystemOverview: FC<Iprops> = (props) => {
  const { system } = useAppSelector((state) => ({
    system: state.basicConfig.system
  }));
  return (
    <OverviewWrap>
      <h2>系统概况</h2>
      <p className="model_name">算法名称&nbsp;:&nbsp;{system.model_name}</p>
      {system.scene != -1 ? (
        <p>默认场景&nbsp;:&nbsp;{subs[system.scene].title}</p>
      ) : (
        ""
      )}

      <p className="default-run-cmd">
        默认运行命令&nbsp;:&nbsp;{system.default_cmd}
      </p>
      <p className="default-dataset-path">
        默认数据集路径&nbsp;:&nbsp;{system.default_data_path}
      </p>
    </OverviewWrap>
  );
};

export default memo(SystemOverview);
