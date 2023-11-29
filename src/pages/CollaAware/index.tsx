import React, { memo, ReactNode } from "react";
import type { FC } from "react";
import { CooperWrap, CreateTaskWraper, CreateDataInput } from "./style";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { findDataAction, runpy1Action, runpy2Action } from "./store";
import ZipUploader from "./c-cpn/uploadzip";
import WeatherForm from "./c-cpn/form";
import IntroductionHandle from "./c-cpn/formintroduction";

interface IProps {
  children?: ReactNode;
}

const CollaAware: FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { tableData } = useAppSelector((state) => ({
    tableData: state.collaAware.tableData
  }));

  const getDataHandle = () => {
    dispatch(findDataAction());
  };

  const runPython2 = () => {
    dispatch(runpy2Action());
  };

  const runPython1 = () => {
    dispatch(runpy1Action());
  };

  const hitRate = tableData.find((item) => item.key === "导弹命中率")?.value;
  const missileData = tableData
    .filter((item) => item.key !== "导弹命中率")
    .map((item) => ({ ...item }));

  return (
    <div>
      <CreateDataInput>
        <div>
          <table>
            <tbody>
              <tr>
                <th>算法文件上传</th>
              </tr>
              <tr>
                <th>(提交zip文件，路径下不含中文)</th>
              </tr>
              <tr>
                <th>
                  <ZipUploader />
                </th>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <th>天气数据上传</th>
              </tr>
              <tr>
                <th>
                  <WeatherForm
                    weather={""}
                    lightIntensity={""}
                    waveHeight={""}
                    shipCount={""}
                    formation={""}
                    randomShipType={""}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </CreateDataInput>
      <IntroductionHandle />
      <CooperWrap>
        <table className="table_v1">
          <tbody>
            <tr>
              <th>导弹编号</th>
              <th>命中情况</th>
            </tr>
            {missileData.length === 0 ? (
              <>
                <tr>
                  <td>missile1</td>
                  <td>暂无数据</td>
                </tr>
                <tr>
                  <td>missile2</td>
                  <td>暂无数据</td>
                </tr>
                <tr>
                  <td>missile3</td>
                  <td>暂无数据</td>
                </tr>
                <tr>
                  <td>missile4</td>
                  <td>暂无数据</td>
                </tr>
                <tr>
                  <td>missile5</td>
                  <td>暂无数据</td>
                </tr>
                <tr>
                  <td>missile6</td>
                  <td>暂无数据</td>
                </tr>
                <tr>
                  <td>missile7</td>
                  <td>暂无数据</td>
                </tr>
                <tr>
                  <td>missile8</td>
                  <td>暂无数据</td>
                </tr>
                <tr>
                  <td>missile9</td>
                  <td>暂无数据</td>
                </tr>
                <tr>
                  <td>missile10</td>
                  <td>暂无数据</td>
                </tr>
              </>
            ) : (
              missileData.map((item, index) => (
                <tr key={index}>
                  <td>{item.key}</td>
                  <td>{item.value}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <table className="table_v1">
          <tbody>
            {hitRate ? (
              <tr>
                <th>导弹命中率</th>
                <td colSpan={2}>{hitRate}</td>
              </tr>
            ) : (
              <tr>
                <th>导弹命中率</th>
                <td colSpan={2}>暂无数据</td>
              </tr>
            )}
          </tbody>
        </table>
      </CooperWrap>

      <CreateTaskWraper>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <Button onClick={runPython1} className="createBtn">
                    运行算法组件1
                  </Button>
                </td>
                <td>
                  <Button onClick={runPython2} className="createBtn">
                    运行算法组件2
                  </Button>
                </td>
                <td>
                  <Button onClick={getDataHandle} className="createBtn">
                    生成报表
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CreateTaskWraper>
    </div>
  );
};

export default memo(CollaAware);
