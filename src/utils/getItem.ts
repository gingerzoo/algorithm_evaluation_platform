import { getNote } from "@/assets/data/local_data";
import { Iwork } from "@/pages/AdaptAbli/store";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

// export function exchangeObj(obj: { s: string }) {
//   const newObj = {};

//   for (const [key, value] of Object.values(obj)) {
//     newObj[value] = key;
//   }
//   return newObj;
// }

export function createOneWork(
  newCondition: string[],
  newIntensity: number[],
  newWeight: number[],
  newWork: Iwork
) {
  newCondition.map((item: string, index: number) => {
    const condition = {
      intensity: newIntensity[index],
      weight: newWeight[index]
    };

    Object.defineProperty(newWork, `${item}`, {
      value: condition,
      writable: true,
      configurable: true,
      enumerable: true
    });
  });
}
