export interface Props {
  deleteItem: () => Promise<void>;
  showModal: boolean;
  hideModal: () => void;
}