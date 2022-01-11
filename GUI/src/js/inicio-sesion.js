import { getLogin, setLogin, setCredenciales } from "../App";
import { Form, Button } from "react-bootstrap";
import React, { Component } from "react";
import { sleep } from "./aux-fun";

import "./../css/inicio-sesion.css";

function Login(context) {
  return (
    <div className="login-user theme-enfasis">
      <Form>
        <p className="h2">{!getLogin() ? 'Acceder a Attendance' : 'Bienvenido a Attendace'}</p>

        <Form.Group className="mb-3" >
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            id="usuario"
            type="user"
            placeholder="Nombre de usuario"
          />
        </Form.Group>

        {!getLogin() &&
          <Form.Group className="mb-3" >
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" id="contraseña" placeholder="Contraseña" />
            <Form.Text className="text-muted">
              No compartas tu contraseña con nadie.
            </Form.Text>
          </Form.Group>
        }
        {!getLogin() &&
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Recordar usuario" />
          </Form.Group>
        }

        {!getLogin() ?
          <Button variant="danger" onClick={() => setTimeout(context.LoginApp, 1)}>
            Acceder
          </Button>
          :
          <Button variant="danger" onClick={() => setTimeout(context.LogoutApp, 1)}>
            Cerrar sesion
          </Button>
        }
      </Form>
    </div>
  );
}

class InicioSesion extends Component {

  LoginApp = async () => {
    const res = async () => await this.submitLogin();
    var respuesta;

    res().then(val => respuesta = val);
    await sleep(1000);

    if (respuesta.code === "SUCCESS") setLogin(true);
    else setLogin(false);
  };

  LogoutApp = () => { setLogin(false); };

  render() {
    return (
      <div>
        {Login(this)}
      </div>
    );
  }

  async submitLogin() {
    const bent = require("bent");
    const post = bent("POST", "json", 200);

    const user = document.getElementById("usuario").value;
    const passw = document.getElementById("contraseña").value;

    try {
      var response = await post(
        "http://localhost:8080/http://localhost:3001/login",
        { username: user, password: passw }
      );
      if (response.code === "SUCCESS") {
        setCredenciales({ username: user, password: passw }, response.rol, response.cursos);
      } else if (response.code === "FAIL" || response.code === "ERROR") {
        setTimeout(alert(response.textplain), 1);
      }
      return response;

    } catch (error) {
      console.error("" + error);
      setTimeout(alert(error + ""), 1);
      return;
    }
  }
}

export default InicioSesion;
