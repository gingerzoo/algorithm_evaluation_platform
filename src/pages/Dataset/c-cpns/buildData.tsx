import React, { memo, MouseEventHandler, ReactElement, useState } from "react";
import type { FC, ReactNode } from "react";
import { AddsetWrap } from "./style";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Upload
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { changeBuildDataAction, getUploadDatasetAction } from "../store";
import { useAppDispatch } from "@/store";
import { failedMessage } from "@/utils/message";

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

  const [uploadType, setUpload] = useState(0);
  console.log("uploadTYpe", uploadType);
  const [dataType, setDataType] = useState(0);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    console.log("hi");
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    setUpload(e.target.value);
  };

  const onDataChange = (e: RadioChangeEvent) => {
    setDataType(e.target.value);
  };

  const onSubmit: MouseEventHandler<HTMLAnchorElement> &
    MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    //检测表单信息是否填写完整
    let flag = false;
    for (const key of Object.keys(form.getFieldsValue())) {
      if (form.getFieldsValue()["data_name"] === undefined) {
        message.open({
          type: "error",
          content: "缺少数据集名称！",
          duration: 2
        });
        break;
      } else if (form.getFieldsValue()["info"] === undefined) {
        message.open({
          type: "error",
          content: "缺少数据集的描述！",
          duration: 2
        });
        break;
      } else if (form.getFieldsValue()["upload"] === undefined) {
        message.open({
          type: "error",
          content: "请上传数据集！",
          duration: 2
        });
        break;
      } else {
        flag = true;
      }
    }

    if (flag) {
      const {
        data_type = 0,
        data_name,
        scene = 0,
        info,
        upload
      } = form.getFieldsValue();
      console.log("hhh", form.getFieldsValue());
      dispatch(changeBuildDataAction({ data_type, data_name, scene, info }));

      //上传压缩包
      const dataset = upload[0].originFileObj;
      console.log("upload", dataset);
      const formdata = new FormData();
      formdata.append("dataset", dataset);
      console.log("现在input框中被选中的压缩包", formdata);
      dispatch(getUploadDatasetAction(formdata));
    }
  };

  //   const uploadHandle = (file, fileList) => {
  //     // const datasets = e.target?.files;
  //     // console.log("当前文件", file);
  //     const { file, fileList } = files;

  //     if (
  //       file.type === "application/x-zip-compressed" ||
  //       file.type === "application/x-rar-compressed"
  //     ) {
  //       console.log("你上传的确实是压缩包");
  //     } else {
  //       failedMessage("只能上传压缩包文件");
  //     }

  //   };
  return (
    <AddsetWrap>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        name={"add_dataser"}
        // disabled={componentDisabled}
        // style={{ width: 420 }}
      >
        {/* <Form.Item label="数据来源" name="dataset_source">
          <Radio.Group>
            <Radio value="add_data"> 新建数据集 </Radio>
            <Radio value="import_data"> 导入数据集</Radio>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item label="数据集名称" name="data_name">
          <Input />
        </Form.Item>
        {/* <Form.Item label="数据集说明" name="dataset_info">
          <Input />
        </Form.Item> */}
        <Form.Item label="数据集说明" name="info">
          <TextArea rows={4} />
        </Form.Item>
        {/* <Form.Item label="创建时间" name="build_time">
          <DatePicker />
        </Form.Item> */}
        <Form.Item label="数据集类型" name="data_type">
          <Radio.Group
            onChange={onDataChange}
            value={dataType}
            defaultValue={0}
          >
            <Radio value={0}> 可见光 </Radio>
            <Radio value={1}> 近红外</Radio>
            <Radio value={2}> radar</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="场景" name="scene">
          <Radio.Group
            onChange={onRadioChange}
            value={uploadType}
            defaultValue={0}
          >
            <Radio value={0}> 导航 </Radio>
            <Radio value={1}> 导引</Radio>
            <Radio value={2}> 遥感</Radio>
            <Radio value={3}> 语音</Radio>
          </Radio.Group>
        </Form.Item>
        {/* <Form.Item label="场景选择" name="upload_type">
          <Select>
            <Select.Option value="zip">导航</Select.Option>
            <Select.Option value="img">导引</Select.Option>
            <Select.Option value="file">遥感</Select.Option>
            <Select.Option value="file">语音</Select.Option>
          </Select>
        </Form.Item> */}

        <Form.Item
          label="上传数据集"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          name="upload"
        >
          <Upload
            action="/upload.do"
            listType="picture-card"
            maxCount={1}
            // directory={uploadType == 2 ? true : false}
            accept=".zip, .rar"
            // beforeUpload={uploadHandle}
            multiple={false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>选择数据集</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            // htmlType="submit"
            onClick={onSubmit}
          >
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </AddsetWrap>
  );
};

export default memo(Addset);
