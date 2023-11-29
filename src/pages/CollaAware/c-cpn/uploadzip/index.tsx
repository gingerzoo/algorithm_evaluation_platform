import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { Uploader } from "./style";
import { BASE_URL } from "@/services/config";

function ZipUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post(BASE_URL + "/collaAware/uploadzip", formData)
        .then((response) => {
          // 处理成功结果
          setUploadResult("文件上传成功");
          console.log(response.data);
        })
        .catch((error) => {
          // 处理失败结果
          setUploadResult("文件上传失败");
          console.error(error);
        });
    }
  };

  return (
    <div>
      <Uploader>
        <table>
          <tbody>
            <tr>
              <th>
                <input
                  type="file"
                  className="fileinput"
                  accept=".zip"
                  onChange={handleFileChange}
                />
              </th>
              <th>
                <button className="createBtn" onClick={handleUpload}>
                  上传算法
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </Uploader>
    </div>
  );
}

export default ZipUploader;
