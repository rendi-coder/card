export const deleteSeparators = (targetValue: string, maxLength: number) => {
  const withoutSeparator = targetValue
    .split("")
    .filter((e) => [" ", "/"].every((s) => s !== e) && e)
    .join("");

  if (withoutSeparator.length > maxLength) {
    return withoutSeparator.slice(0, withoutSeparator.length - 1);
  }
  return withoutSeparator;
};

export const separateValue = (
  value: string,
  minLength: number,
  maxLength: number,
  separator: string,
  lastIndexSeparator: number
) => {
  if (value.length <= minLength || value.trim().length > maxLength) {
    return value;
  }
  const check = (i: number) =>
    (i + 1) % minLength === 0 &&
    i + 1 < maxLength &&
    i + 1 < value.length &&
    i < lastIndexSeparator;
  return value
    .split("")
    .map((e: string, i: number) => {
      if (check(i)) {
        return `${e}${separator}`;
      }
      return e;
    })
    .join("");
};
