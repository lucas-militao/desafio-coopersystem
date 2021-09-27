import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { CarList } from "../../components/CarList";
import { ModalCarDetails } from "../../components/ModalCarDetails";
import { SearchForm } from "../../components/SearchForm";
import { CarProps } from "../../interfaces/types";

import api from "../../services/api";

import {
  Container,
} from './styles';

type filterOptionsType = 'nome' | 'origem';

export function Home() {
  const [cars, setCars] = useState<CarProps[]>([] as CarProps[]);
  const [carsFiltered, setCarsFiltered] = useState<CarProps[]>([] as CarProps[]);
  const [carDetails, setCarDetails] = useState<CarProps>({} as CarProps);
  const [showModal, setShowModal] = useState(false); 

  const history = useHistory();

  function handleShowModalCarDetails(id: string) {
    setCarDetails(
      cars.filter(item => item.id === id)[0]
    );

    setShowModal(true);
  }

  function handleHideModal() {
    setShowModal(false);
    setCarDetails({} as CarProps);
  }

  function handleNavigateToEditFormCar(id: string) {
    const carToEdit = cars.filter(car => car.id === id)[0];

    history.push('/formcar', carToEdit);
  }

  async function handleRemoveItem(id: string) {
    try {
      await api.delete(`/cars/${id}`);

      const carsListFormatted = cars.filter(item => item.id !== id);
      setCars(carsListFormatted);
      setCarsFiltered(carsListFormatted);
    } catch (error) {
      console.log(error);
    }
  }

  function handleFilterList(filterOption: filterOptionsType, filterSearchInput: string) {
    if (filterOption === 'nome') {
      setCarsFiltered(cars.filter(car => 
        car.name.toLowerCase().includes(filterSearchInput.toLowerCase())));

    } else if (filterOption === 'origem') {
      setCarsFiltered(cars.filter(car => 
        car.origin.toLowerCase() === filterSearchInput.toLowerCase()));

    } 
    
    if(filterSearchInput === '') {
      setCarsFiltered(cars);
    }
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
        setCarsFiltered(response.data);
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
      <br />
      <CarList 
        data={carsFiltered}
        removeItem={handleRemoveItem}
        editItem={handleNavigateToEditFormCar}
        showCarDetails={handleShowModalCarDetails}
      />

      <ModalCarDetails
        car={carDetails}
        showModal={showModal}
        hideModal={handleHideModal}
      />
    </Container>
  )
}