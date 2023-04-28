/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
export function getHighestOccurrenceAndNum(arr: Array<string>) {
  const obj = {} as Record<string, number>;

  let maxValue;
  let maxVal;

  for (const value of arr) {
    obj[value] = ++obj[value] || 1;

    if (maxVal === undefined || obj[value] > maxVal) {
      maxValue = value;
      maxVal = obj[value];
    }
  }

  return [maxValue, maxVal];
}
