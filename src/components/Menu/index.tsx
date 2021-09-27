import React from "react";
import { Container, Navbar, NavDropdown } from "react-bootstrap";

export function Menu() {

  return(
    <Navbar bg="light" fixed="top">
      <Container>
        <Navbar.Brand>Menu</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">

          <NavDropdown title="Carros" id="basic-nav-dropdown">
            <NavDropdown.Item href="/">Lista dos carros</NavDropdown.Item>
            <NavDropdown.Item href="/register">Registrar novo carro</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Marcas" id="basic-nav-dropdown">
            <NavDropdown.Item href="/brands">Lista das brands</NavDropdown.Item>
            <NavDropdown.Item href="/brands/register">Registrar nova marca</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}