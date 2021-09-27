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
import { ModalConfirmDelete } from "../../components/ModelConfirmDelete";
import { LoadingSpin } from "../../components/LoadingSpin";

type filterOptionsType = 'nome' | 'origem';

export function BrandsInfo() {
  const [brands, setBrands] = useState<BrandProps[]>([] as BrandProps[]);
  const [brandsFilteredList, setBrandsFilteredList] = useState<BrandProps[]>([] as BrandProps[]);
  const [brandDetails, setBrandDetails] = useState<BrandProps>({} as BrandProps);
  const [showModalBrandDetails, setShowModalBrandDetails] = useState(false);
  const [idBrandToDelete, setIdBrandToDelete] = useState('');
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  function handleDeleteBrand(id: string) {
    setShowModalConfirmDelete(true);
    setIdBrandToDelete(id);
  }

  async function deleteItem() {
    try {
      setIsLoading(true);
      setShowModalConfirmDelete(false);
      await api.delete(`/brands/${idBrandToDelete}`);

      const brandsListFormatted = brands.filter(item => item.id !== idBrandToDelete);
      setBrands(brandsListFormatted);
      setBrandsFilteredList(brandsListFormatted);
      setIdBrandToDelete('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleHideModelConfirmDelete() {
    setShowModalConfirmDelete(false);
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
    setShowModalBrandDetails(true);
  }

  function handleCloseModalBrandDetails() {
    setShowModalBrandDetails(false);
    setBrandDetails({} as BrandProps);
  }

  function handleNavigateToEditBrandForm(id: string) {
    const brand = brands.filter(item => item.id === id)[0];

    history.push('/formbrand', brand);
  }

  useEffect(() => {
    async function fetchBrands() {
      try {
        setIsLoading(true);
        const response = await api.get('/brands');
        setBrands(response.data);
        setBrandsFilteredList(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBrands();
  }, [])

  return(
    <Container>
      <SearchForm
        filterList={handleFilterBrandsList}
      />
      <br />
      {
        isLoading ?
        <LoadingSpin /> :
        <BrandList 
          data={brandsFilteredList}
          deleteItem={handleDeleteBrand}
          showItemDetails={handleShowBrandDetails}
          editItem={handleNavigateToEditBrandForm}
        />
      }

      <ModalBrandDetails 
        brand={brandDetails}
        showModal={showModalBrandDetails}
        hideModal={handleCloseModalBrandDetails}
      />

      <ModalConfirmDelete
        showModal={showModalConfirmDelete}
        hideModal={handleHideModelConfirmDelete}
        deleteItem={deleteItem}
      />
      
    </Container>
  );
}