import { FormControlProps } from "react-bootstrap";
import { Control } from "react-hook-form";

export interface Props extends FormControlProps{
  control: Control;
  name: string;
  title?: string;
}