// https://stackoverflow.com/a/59398737

export const swapArrayLocs = (arr, index1, index2) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
};
