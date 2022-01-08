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
    case "short_term":
      return " (Past Month)";
    case "medium_term":
      return " (Past 6 months)";
    case "long_term":
      return " (All Time)";
    default:
      return "";
  }
};
