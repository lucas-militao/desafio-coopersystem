import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { CarList } from "../../components/CarList";
import { ModalCarDetails } from "../../components/ModalCarDetails";
import { ModalConfirmDelete } from "../../components/ModelConfirmDelete";
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
  const [showModalCarDetails, setShowModalCarDetails] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState('');

  const history = useHistory();

  function handleShowModalCarDetails(id: string) {
    setCarDetails(
      cars.filter(item => item.id === id)[0]
    );

    setShowModalCarDetails(true);
  }

  function handleHideModalCarDetails() {
    setShowModalCarDetails(false);
    setCarDetails({} as CarProps);
  }

  function handleHideModelConfirmDelete() {
    setShowModalConfirmDelete(false);
  }

  function handleNavigateToEditFormCar(id: string) {
    const carToEdit = cars.filter(car => car.id === id)[0];

    history.push('/formcar', carToEdit);
  }

  function handleRemoveItem(id: string) {
    setShowModalConfirmDelete(true);
    setCarIdToDelete(id);
  }

  async function deleteItem() {
    try {
      await api.delete(`/cars/${carIdToDelete}`);

      const carsListFormatted = cars.filter(item => item.id !== carIdToDelete);
      setCars(carsListFormatted);
      setCarsFiltered(carsListFormatted);
      setCarIdToDelete('');
      setShowModalConfirmDelete(false);
    } catch (error) {
      console.log('');
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
        showModal={showModalCarDetails}
        hideModal={handleHideModalCarDetails}
      />

      <ModalConfirmDelete
        showModal={showModalConfirmDelete}
        hideModal={handleHideModelConfirmDelete}
        deleteItem={deleteItem}
      />
    </Container>
  )
}