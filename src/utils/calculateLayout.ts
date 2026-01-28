import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const TARGET_NUM_COLUMNS = 8;

export const calculateLayout = (): {
  finalItemSize: number;
  finalNumColumns: number;
} => {
  const idealItemSize = Math.floor(width / TARGET_NUM_COLUMNS);

  const finalNumColumns = Math.floor(width / idealItemSize);

  const finalItemSize = Math.floor(width / finalNumColumns);

  return {
    finalItemSize,
    finalNumColumns,
  };
};
