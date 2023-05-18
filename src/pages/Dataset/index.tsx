import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { DatasetWrap } from "./style";

import { useAppDispatch, useAppSelector } from "@/store";
import { getDatasetInfoAction } from "./store";
import { Button, Modal } from "antd";
import Add_dataset from "./c-cpns/buildData";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface Iprops {
  children?: ReactNode;
}

const Dataset: FC<Iprops> = (props) => {
  const { datasets } = useAppSelector((state) => ({
    datasets: state.datasetMan.datasets
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDatasetInfoAction());
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(datasets);
  const defaultDatas = Object.values(datasets).map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>
          {!item.status ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
        </td>
        <td>{item.label_num}</td>
        <td>{`${item.sample_num}/${item.sample_labled}`}</td>
        <td>{item.label_all}</td>
        <td className="oper">
          <span>上传</span>
          <span className="divider">|</span>
          <span>标注</span>
          <span className="divider">|</span>
          <span>导出</span>
        </td>
      </tr>
    );
  });
  return (
    <DatasetWrap>
      <div className="dataset-body">
        <h3>数据集管理</h3>
        <div className="mytable">
          <table className="table_v1">
            <thead>
              <tr>
                <th>数据集名称</th>
                <th>状态</th>
                <th>标签数量</th>
                <th>样本数量/已标注</th>
                <th>标注总数</th>
                {/* <th>更新时间</th> */}
                <th>操作</th>
              </tr>
            </thead>
            <tbody>{defaultDatas}</tbody>
          </table>
          <button className="newData" onClick={showModal}>
            新建
          </button>
        </div>
      </div>
      <Modal
        title="新建数据集"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Add_dataset />
      </Modal>
    </DatasetWrap>
  );
};

export default memo(Dataset);
