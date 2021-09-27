import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BrandList } from "../../components/BrandList";
import { ModalBrandDetails } from "../../components/ModalBrandDetails";
import { SearchForm } from "../../components/SearchForm";
import api from "../../services/api";
import { BrandProps } from '../../interfaces/types';

import {
  Container,
} from './styles';

type filterOptionsType = 'nome' | 'origem';

export function BrandsInfo() {
  const [brands, setBrands] = useState<BrandProps[]>([] as BrandProps[]);
  const [brandsFilteredList, setBrandsFilteredList] = useState<BrandProps[]>([] as BrandProps[]);
  const [brandDetails, setBrandDetails] = useState<BrandProps>({} as BrandProps);
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  async function handleDeleteBrand(id: string) {
    try {
      await api.delete(`/brands/${id}`);

      const brandsListFormatted = brands.filter(item => item.id !== id);
      setBrands(brandsListFormatted);
      setBrandsFilteredList(brandsListFormatted);
    } catch (error) {
      console.log(error);
    }
  }

  function handleFilterBrandsList(filterOption: filterOptionsType, filterSearchInput: string) {
    if (filterOption === 'nome') {
      setBrandsFilteredList(
        brands.filter(brand => 
          brand.name.toLowerCase().includes(filterSearchInput.toLowerCase()))
      );
    }
    else if (filterOption === 'origem') {
      setBrandsFilteredList(
        brands.filter(brand => 
          brand.origin.toLowerCase() === filterSearchInput.toLowerCase())
      );
    }

    if(filterSearchInput === '') {
      setBrandsFilteredList(brands);
    } 
  }

  function handleShowBrandDetails(id: string) {
    setBrandDetails(
      brands.filter(item => item.id === id)[0]
    );
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setBrandDetails({} as BrandProps);
  }

  function handleNavigateToEditBrandForm(id: string) {
    const brand = brands.filter(item => item.id === id)[0];

    history.push('/formbrand', brand);
  }

  useEffect(() => {
    async function fetchBrands() {
      const response = await api.get('/brands');
      setBrands(response.data);
      setBrandsFilteredList(response.data);
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
        data={brandsFilteredList}
        deleteItem={handleDeleteBrand}
        showItemDetails={handleShowBrandDetails}
        editItem={handleNavigateToEditBrandForm}
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