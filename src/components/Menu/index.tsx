import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export function Menu() {

  return(
    <Navbar bg="light" >
      <Container>
        <Navbar.Brand>Menu</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">

          <NavDropdown title="Carros" id="basic-nav-dropdown">
            <NavDropdown.Item href="/carros">Lista dos carros</NavDropdown.Item>
            <NavDropdown.Item href="/registercarros">Registrar novo carro</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Marcas" id="basic-nav-dropdown">
            <NavDropdown.Item href="/marcas">Lista das marcas</NavDropdown.Item>
            <NavDropdown.Item href="/formbrand">Registrar nova marca</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}