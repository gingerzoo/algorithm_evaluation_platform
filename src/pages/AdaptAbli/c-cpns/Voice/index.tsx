import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import MyTable2 from "../table2";

interface Iprops {
  children?: ReactNode;
}

const AdapVoice: FC<Iprops> = (props) => {
  return (
    <div>
      <MyTable2
        workConditions={[
          [
            { condition: "noise", label: "噪声", intensity: 6, weight: 9 },
            {
              condition: "dropout",
              label: "丢码",
              intensity: 5,
              weight: 9
            },
            {
              condition: "explosion",
              label: "爆炸音",
              intensity: 2,
              weight: 7
            },
            { condition: "noise", label: "图像噪声", intensity: 3, weight: 8 }
          ],
          [
            {
              condition: "whitenoise",
              label: "白噪声",
              intensity: 5,
              weight: 7
            },

            {
              condition: "deformation",
              label: "形变",
              intensity: 4,
              weight: 9
            },
            { condition: "ambiguity", label: "模糊", intensity: 3, weight: 9 },
            { condition: "dropout", label: "丢码", intensity: 3, weight: 8 }
          ]
        ]}
      />
    </div>
  );
};

export default memo(AdapVoice);
