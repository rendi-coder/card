export const correctDate = (value: string) => {
  const correctFirstvalue = value[0] === "0" || value[0] === "1";
  if (value.length === 1 && !correctFirstvalue) return `0${value}`;
  if (
    value.length === 2 &&
    ((value[0] === "1" && +value[1] > 2) ||
      (value[0] === "0" && value[1] === "0"))
  )
    return value.slice(0, 1);
  if (value.length === 3) {
    return `${value.slice(0, 2) + 2 + value.slice(3)}`;
  }
  if (value.length === 4) {
    return `${value.slice(0, 3) + 0 + value.slice(4)}`;
  }
  return value;
};

export const checkOnChangeDate = (value: string, prevValue: string) =>
  isFinite(+value) &&
  (value.slice(0, value.length - 1) === prevValue ||
    prevValue.slice(0, prevValue.length - 1) === value);
