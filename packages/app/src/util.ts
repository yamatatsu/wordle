export const padArray = <T>(arr: T[], len: number, fill: T): T[] =>
  arr.concat(Array(len - arr.length).fill(fill));

export const range = (len: number): number[] => [...Array(len).keys()];
