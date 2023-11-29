import React from "react";
import { Introduction } from "./style";
import weather from "@/assets/images/weather.png";
import formation from "@/assets/images/formation.png";

function IntroductionHandle() {
  return (
    <Introduction>
      <table className="table_v1">
        <tbody>
          <tr>
            <td>天气工况</td>
            <td>
              <img src={weather} />
            </td>
          </tr>
          <tr>
            <td>阵型参数</td>
            <td>
              <img src={formation} />
            </td>
          </tr>
        </tbody>
      </table>
    </Introduction>
  );
}

export default IntroductionHandle;
