import { CarProps } from "../../interfaces/types";

export interface Props {
  data: CarProps[];
  removeItem(id: string): void;
  editItem(id: string): void;
  showCarDetails(id: string): void;
}