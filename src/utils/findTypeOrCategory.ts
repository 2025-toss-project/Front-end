import { categoryList } from "../constants/category";
import { payTypeList } from "../constants/payType";

export const findType = (type: string) => {
  return payTypeList.find((item) => item.type === type);
};
export const findCategory = (category: string) => {
  return categoryList.find((item) => item.text === category);
};
