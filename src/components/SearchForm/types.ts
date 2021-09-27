export type filterOptionsType = 'nome' | 'origem';

export interface Props {
  filterList: (filterOption: filterOptionsType, filterSearchInput: string) => void;
}