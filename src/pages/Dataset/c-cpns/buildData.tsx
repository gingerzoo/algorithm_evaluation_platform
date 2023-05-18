import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { AddsetWrap } from "./style";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  TreeSelect,
  Upload
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface Iprops {
  children?: ReactNode;
}

const Addset: FC<Iprops> = (props) => {
  //   const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [submittable, setSubmittable] = React.useState(false);
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    console.log("hi");
  };
  return (
    <AddsetWrap>
      {/*   <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        禁止表格
      </Checkbox> */}
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        name={"add_dataser"}
        // disabled={componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="数据来源" name="dataset_source">
          <Radio.Group>
            <Radio value="add_data"> 新建数据集 </Radio>
            <Radio value="import_data"> 导入数据集</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="数据集名称" name="dataset_name">
          <Input />
        </Form.Item>
        <Form.Item label="数据集规格" name="dataset_size">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        {/*  <Form.Item label="上传方式">
          <Radio.Group>
            <Radio value="add_data"> 压缩包上传 </Radio>
            <Radio value="import_data"> 图片上传</Radio>
            <Radio value="import_data"> 文件夹上传</Radio>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item label="上传方式" name="upload_type">
          <Select>
            <Select.Option value="zip">压缩包上传</Select.Option>
            <Select.Option value="pic">图片上传</Select.Option>
            <Select.Option value="file">文件夹上传</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="创建时间" name="build_time">
          <DatePicker />
        </Form.Item>

        {/*     <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item> */}

        <Form.Item
          label="上传数据集"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          name="upload"
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>选择数据集</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">提交</Button>{" "}
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </AddsetWrap>
  );
};

export default memo(Addset);
