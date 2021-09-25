import React, { useEffect, useState } from "react";
import { CarList } from "../../components/CarList";
import api from "../../services/api";

import {
  Container
} from './styles';

interface CarProps {
  id: string;
  nome: string;
  km_por_galao: number;
  cilindros: number;
  cavalor_de_forca: number;
  peso: number;
  aceleracao: number;
  ano: string;
  origem: string;
}

export function Home() {
  const [carros, setCarros] = useState<CarProps[]>([] as CarProps[]);

  async function handleRemoveItem(id: string) {
    try {
      await api.delete(`/carros/${id}`);

      const carrosListFormatted = carros.filter(item => item.id !== id);
      setCarros(carrosListFormatted);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/carros');
        setCarros(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <CarList 
        data={carros}
        removeItem={handleRemoveItem}
      />
    </Container>
  )
}