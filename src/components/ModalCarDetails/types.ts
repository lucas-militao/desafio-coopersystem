import { CarProps } from "../../interfaces/types";

export interface Props {
  car: CarProps;
  showModal: boolean;
  hideModal: () => void;
}