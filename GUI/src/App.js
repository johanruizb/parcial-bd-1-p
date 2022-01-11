import React, { Component } from "react";
import "./App.css";

import Carrusel from "./js/carrusel";
import Header from "./js/header";
import Footer from "./js/footer";
import Cards from "./js/cards";

var context = null;

export function setLogin(bol) {
  if (bol)
    setTimeout(context.Login, 1);
  else
    setTimeout(context.Logout, 1);
}

export function getLogin() {
  return context.state.isLogin;
}

export function setRol(rol) {
  if (rol === "ADMIN")
    setTimeout(context.Admin, 1);
  else
    setTimeout(context.User, 1);
}

export function getRol() {
  return context.state.rol;
}

export function setCredenciales(credencial, cargo, cur) {
  context.credenciales = { username: credencial.username, password: credencial.password };
  context.cursos = cur;
  context.setState({ rol: cargo });
}

export function getCredenciales() {
  return context.credenciales;
}

export function getCursos() {
  return context.cursos;
}

class App extends Component {
  state = { isLogin: false, rol: "" };
  credenciales = { username: "", password: "" };
  cursos = [{ curso_nombre: '', curso_id: '' }, { curso_nombre: '', curso_id: '' }];

  componentDidMount() {
    document.body.classList.remove("theme-base");
    document.body.classList.add("theme-base");
  }

  Login = () => {
    this.setState({ isLogin: true });
  }

  Logout = () => {
    this.setState({ isLogin: false });
  };

  render() {
    context = this;

    return (
      <div className="App">
        <Header />
        <Carrusel />
        <Cards />
        <Footer />
      </div>
    );
  }
}

export default App;
