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
      <Route path="/formcar" exact component={FormCar} />
      <Route path="/formcar/:car" exact component={FormCar} />

      <Route path="/marcas" exact component={BrandsInfo} />
      <Route path="/formbrand" exact component={FormBrand} />
      <Route path="/formbrand/:brand" exact component={FormBrand} />
    </Switch>
  );
};