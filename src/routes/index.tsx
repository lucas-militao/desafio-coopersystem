import React from "react";
import { Switch } from 'react-router-dom';
import { BrandsInfo } from "../pages/BrandsInfo";
import { FormBrand } from "../pages/FormBrand";
import { FormCar } from "../pages/FormCar";
import { Home } from "../pages/Home";
import { Route } from "./Route";

export function Routes() {

  return(
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={FormCar} />
      <Route path="/register/:car" exact component={FormCar} />

      <Route path="/brands" exact component={BrandsInfo} />
      <Route path="/brands/register" exact component={FormBrand} />
      <Route path="/brands/register/:brand" exact component={FormBrand} />
    </Switch>
  );
};