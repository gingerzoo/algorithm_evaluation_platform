import React, { useState } from "react";
import axios from "axios";
import { CreateForm } from "./style";

interface WeatherFormProps {
  weather: string;
  lightIntensity: string;
  waveHeight: string;
  shipCount: string;
  formation: string;
  randomShipType: string;
}

const WeatherForm: React.FC<WeatherFormProps> = () => {
  const [weather, setWeather] = useState("");
  const [lightIntensity, setLightIntensity] = useState("");
  const [waveHeight, setWaveHeight] = useState("");
  const [shipCount, setShipCount] = useState("");
  const [formation, setFormation] = useState("");
  const [randomShipType, setRandomShipType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://10.2.34.131:4444/collaAware/save-params",
        {
          weather,
          lightIntensity,
          waveHeight,
          shipCount,
          formation,
          randomShipType
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CreateForm>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="weather">天气（整数【1，7】）：</label>
              </td>
              <td>
                <input
                  type="text"
                  id="weather"
                  className="fileinput"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="lightIntensity">
                  光照强度（浮点数（0，10】）：
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="lightIntensity"
                  className="fileinput"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="waveHeight">波浪高度（浮点数（0，3】）：</label>
              </td>
              <td>
                <input
                  type="text"
                  id="waveHeight"
                  className="fileinput"
                  value={waveHeight}
                  onChange={(e) => setWaveHeight(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="shipCount">船只数量（整数【1，6】）：</label>
              </td>
              <td>
                <input
                  type="text"
                  id="shipCount"
                  className="fileinput"
                  value={shipCount}
                  onChange={(e) => setShipCount(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="formation">阵形（整数【1，5】）：</label>
              </td>
              <td>
                <input
                  type="text"
                  id="formation"
                  className="fileinput"
                  value={formation}
                  onChange={(e) => setFormation(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit" className="createBtn">
                  保存参数
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </CreateForm>
  );
};

export default WeatherForm;
