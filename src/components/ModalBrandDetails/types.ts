import { BrandProps } from "../../interfaces/types";

export interface Props {
  brand: BrandProps;
  showModal: boolean;
  hideModal: () => void;
}