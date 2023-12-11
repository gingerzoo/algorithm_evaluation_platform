import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { AttackDetWrap } from "./style";
import { ConfigProvider, RadioChangeEvent } from "antd";
import { TreeSelect, Radio, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeDataSets, changeReality } from "../../store";
import { datasets } from "@/assets/data/local_data";

interface Iprops {
  children?: ReactNode;
}

interface Idata {
  title: string;
  value: string;
  key: string;
}

const SelectData: FC<Iprops> = (props) => {
  const DataSets: Idata[] = datasets.map((item, index) => ({
    title: item,
    value: item,
    key: item
  }));

  const treeData = [
    {
      title: "波段",
      value: "0",
      key: "0",
      children: DataSets
    }
  ];
  const defaultValue = treeData.map((node) => node.value);
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.multiwave.data);
  const onChange0 = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);

    // 假设你的 dispatch 函数接受一个对象作为参数，包含了你想要更新的状态值
    dispatch(changeReality(selectedValue));
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    dispatch(changeReality(value));
  };
  const onChange = (newValue: string[]) => {
    console.log(newValue);
    dispatch(changeDataSets({ value: newValue }));
  };

  return (
    <AttackDetWrap>
      <div className="box">
        {/*         <Radio.Group className="Radio" onChange={onChange0}>
          <Radio value={"basic_effectiveness"}>真实数据集</Radio>
          <Radio value={"虚拟数据集路径"}>仿真数据集</Radio>
        </Radio.Group> */}
        {/*         <Select
          style={{ width: "60%" }}
          placeholder="数据集"
          onChange={handleChange}
          popupClassName={`select-item`}
          size="large"
          options={[
            {
              value: "basic_effectiveness/remote_sensing",
              label: "基础样本库"
            },
            { value: "虚拟数据集路径", label: "其他样本库" }
          ]}
        /> */}
        <TreeSelect
          showSearch
          style={{ width: "60%" }}
          size="large"
          // dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="请选择多波段组合"
          allowClear
          multiple
          treeCheckable={true}
          treeDefaultExpandAll
          onChange={onChange}
          treeData={treeData}
          defaultValue={defaultValue}
        />
      </div>
    </AttackDetWrap>
  );
};

export default memo(SelectData);
