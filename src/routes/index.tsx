import React from "react";
import { Switch } from 'react-router-dom';
import { FormCar } from "../pages/FormCar";
import { Home } from "../pages/Home";
import { Route } from "./Route";

export function Routes() {

  return(
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/formcar" exact component={FormCar} />
      <Route path="/formcar/:car" exact component={FormCar} />
    </Switch>
  );
};