import { filterOptionsType } from "../../interfaces/types";

export interface Props {
  filterList: (filterOption: filterOptionsType, filterSearchInput: string) => void;
}