import { BrandProps } from "../../interfaces/types";

export interface Props {
  data: BrandProps[];
  deleteItem: (id: string) => void;
  showItemDetails: (id: string) => void;
  editItem: (id: string) => void;
}