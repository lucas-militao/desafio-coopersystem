export interface CarProps {
  id: string;
  name: string;
  km_per_gallon: number;
  cylinders: number;
  horsepower: number;
  weight: number;
  acceleration: number;
  year: string;
  origin: string;
}

export interface BrandProps {
  id: string;
  name: string;
  origin: string;
}

export type filterOptionsType = 'nome' | 'origem'; 