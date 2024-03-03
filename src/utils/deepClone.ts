function isObject(value: any) {
  const valueType = typeof value;
  return (
    (valueType !== null && typeof value === "object") ||
    typeof value === "function"
  );
}

export function deepClone(originValue: any) {
  // 如果不是对象类型则直接将当前值返回
  if (!isObject(originValue)) return originValue;

  const newObject: any = {};
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key]);
  }

  return newObject;
}
