import React, { useEffect, useState } from "react";
import { BrandList } from "../../components/BrandList";
import { ModalBrandDetails } from "../../components/ModalBrandDetails";
import { SearchForm } from "../../components/SearchForm";
import api from "../../services/api";

import {
  Container,
} from './styles';

type filterOptionsType = 'nome' | 'origem';

interface BrandProps {
  id: string;
  nome: string;
  origem: string;
}

export function BrandsInfo() {
  const [marcas, setMarcas] = useState<BrandProps[]>([] as BrandProps[]);
  const [marcasFilteredList, setMarcasFilteredList] = useState<BrandProps[]>([] as BrandProps[]);
  const [brandDetails, setBrandDetails] = useState<BrandProps>({} as BrandProps);
  const [showModal, setShowModal] = useState(false); 

  async function handleDeleteBrand(id: string) {
    try {
      await api.delete(`/marcas/${id}`);

      const brandsListFormatted = marcas.filter(item => item.id !== id);
      setMarcas(brandsListFormatted);

    } catch (error) {
      console.log(error);
    }
  }

  function handleFilterBrandsList(filterOption: filterOptionsType, filterSearchInput: string) {
    if (filterOption === 'nome') {
      setMarcasFilteredList(
        marcas.filter(marca => 
          marca.nome.toLowerCase().includes(filterSearchInput.toLowerCase()))
      );
    }
    else if (filterOption === 'origem') {
      setMarcasFilteredList(
        marcas.filter(marca => 
          marca.origem.toLowerCase() === filterSearchInput.toLowerCase())
      );
    }

    if(filterSearchInput === '') {
      setMarcasFilteredList(marcas);
    } 
  }

  function handleShowBrandDetails(id: string) {
    setBrandDetails(
      marcas.filter(item => item.id === id)[0]
    );
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setBrandDetails({} as BrandProps);
  }

  useEffect(() => {
    async function fetchBrands() {
      const response = await api.get('/marcas');
      setMarcas(response.data);
      setMarcasFilteredList(response.data);
    }
    fetchBrands();
  }, [])

  return(
    <Container>
      <SearchForm
        filterList={handleFilterBrandsList}
      />
      <br />
      <BrandList 
        data={marcasFilteredList}
        deleteItem={handleDeleteBrand}
        showItemDetails={handleShowBrandDetails}
      />

      { showModal && 
        <ModalBrandDetails 
          brand={brandDetails}
          showModal
          hideModal={handleCloseModal}
        /> 
      }
    </Container>
  );
}