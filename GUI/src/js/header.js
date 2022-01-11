import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import InicioSesion from "./inicio-sesion";
import React, { Component } from "react";
import { changeTheme } from "./aux-fun";
import { getLogin } from "./../App";

import "./../css/header.css";

class Header extends Component {

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="#home">Attendace</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" id="dropdown-x">

                <NavDropdown title="" id="nav-dropdown" menuVariant="dark">
                  <NavDropdown.Item eventKey="4">
                    Separated link
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="1">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => changeTheme()}>
                    Modo oscuro
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav id="login-dropdown">
                <NavDropdown title={!getLogin() ? "Iniciar sesion" : "Cerrar sesion"}>
                  <InicioSesion />
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div >
    );
  }
}

export default Header;
