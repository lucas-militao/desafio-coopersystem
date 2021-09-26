import React, { useEffect, useState } from "react";

import { CarList } from "../../components/CarList";
import { SearchForm } from "../../components/SearchForm";

import api from "../../services/api";

import {
  Container,
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

type filterOptionsType = 'nome' | 'origem';

export function Home() {
  const [carros, setCarros] = useState<CarProps[]>([] as CarProps[]);
  const [carrosFiltered, setCarrosFiltered] = useState<CarProps[]>([] as CarProps[]);

  async function handleRemoveItem(id: string) {
    try {
      await api.delete(`/carros/${id}`);

      const carrosListFormatted = carros.filter(item => item.id !== id);
      setCarros(carrosListFormatted);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFilterList(filterOption: filterOptionsType, filterSearchInput: string) {
    if (filterOption === 'nome') {
      setCarrosFiltered(carros.filter(carro => 
        carro.nome.toLowerCase().includes(filterSearchInput.toLowerCase())));

    } else if (filterOption === 'origem') {
      setCarrosFiltered(carros.filter(carro => 
        carro.origem.toLowerCase() === filterSearchInput.toLowerCase()));

    } 
    
    if(filterSearchInput === '') {
      setCarrosFiltered(carros);
    }
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/carros');
        setCarros(response.data);
        setCarrosFiltered(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <SearchForm 
        filterList={handleFilterList}
      />

      <CarList 
        data={carrosFiltered}
        removeItem={handleRemoveItem}
      />
    </Container>
  )
}