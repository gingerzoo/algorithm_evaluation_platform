import React, { memo } from "react";
import type { FC, ReactNode } from "react";

import MyTable2 from "../table2";

interface Iprops {
  children?: ReactNode;
}

const AdapNav: FC<Iprops> = (props) => {
  return (
    <div>
      <MyTable2
        workConditions={[
          [
            { condition: "occlusion", label: "遮挡", intensity: 6, weight: 9 },
            {
              condition: "illumination",
              label: "光照",
              intensity: 5,
              weight: 9
            },
            {
              condition: "deformation",
              label: "形变",
              intensity: 2,
              weight: 7
            },
            { condition: "noise", label: "图像噪声", intensity: 3, weight: 8 }
          ],
          [
            { condition: "clouds", label: "云雾", intensity: 5, weight: 7 },
            {
              condition: "illumination",
              label: "光照",
              intensity: 6,
              weight: 6
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

export default memo(AdapNav);
