import React from "react";

import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute
} from 'react-router-dom'

interface RouteProps extends ReactDOMRouteProps   {
  component: React.ComponentType;
}

export function Route({
  component: Component,
  ...rest
}: RouteProps) {

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return <Component />
      }}
    />
  );
}