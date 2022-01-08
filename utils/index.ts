import { LONG_TERM, MEDIUM_TERM, SHORT_TERM } from "./constants";

export const splitArray = <T extends unknown>(arr: T[], size: number): T[] => {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / size);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
};

export const termString = (term) => {
  switch (term) {
    case SHORT_TERM:
      return " (Past Month)";
    case MEDIUM_TERM:
      return " (Past 6 months)";
    case LONG_TERM:
      return " (All Time)";
    default:
      return "";
  }
};
