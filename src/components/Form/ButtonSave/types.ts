import { ButtonProps } from "react-bootstrap";

export interface Props extends ButtonProps{
  onClick: () => void;
  isLoading: boolean;
}