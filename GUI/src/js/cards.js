import { Card, Button } from "react-bootstrap";
import { getCredenciales, getCursos, getLogin, getRol } from "./../App";
import React, { Component } from "react";
import Placehorder from "../img/1.png";
import Formulario from "./form";

import "bootstrap/dist/css/bootstrap.css";
import "../css/cards.css";
import "../App.css";

class Cards extends Component {
  state = { isEdit: false };

  setEdit() {
    this.setState(() => { return { isEdit: !this.state.isEdit } });
  }

  cursos = getCursos();
  textDefaultBody =
    "Some quick example text to build on the card title and make up the  bulk of the card's content";
  textDefaultTitle = "Card Title";
  textTitle = (this.cursos[0].curso_nombre + "-" + this.cursos[0].curso_id);
  textBody = ("Curso de " + this.cursos[0].curso_nombre);

  render() {
    this.cursos = getCursos();
    this.textTitle = (this.cursos[0].curso_nombre + "-" + this.cursos[0].curso_id);
    this.textBody = ("Curso de " + this.cursos[0].curso_nombre);

    return this.cartasView(this);
  }

  cartasView() {
    return (
      <div className="card-container">

        <Card className="cartas theme-enfasis">
          <Card.Img variant="top" src={Placehorder} />
          <Card.Body>
            <Card.Title>
              {!getLogin() ? this.textDefaultTitle : (!this.state.isEdit ? this.textTitle : (getRol() === "ADMIN") ? "Editar curso" : "Marcar asistencia")}
            </Card.Title>
            <div>
              {!getLogin() ? this.textDefaultBody : (!this.state.isEdit ? this.textBody : <Formulario />)}
            </div>
          </Card.Body>

          {
            getLogin() &&
            <Card.Body style={{ textAlign: "center" }}>
              {
                !this.state.isEdit && getLogin() ?
                  (
                    (getRol() === "USER") ? <Card.Link onClick={() => { this.setEdit() }}>Marcar asistencia</Card.Link> :
                      (getRol() === "ADMIN") ? <Card.Link onClick={() => { this.setEdit() }}>Editar curso</Card.Link> : null
                  )
                  : getLogin() ?
                    <Button variant="danger" onClick={() => { this.submitAsistencia() }}>{(getRol() === "ADMIN") ? "Guardar cambios" : "Marcar asistencia"}</Button> : null
              }
            </Card.Body>
          }
        </Card>
      </div>
    );
  }

  async submitAsistencia() {
    if (this.state.isEdit) {
      this.setEdit();
      const bent = require("bent");
      const post = bent("POST", "json", 200);

      try {
        var response = await post(
          "http://localhost:8080/http://localhost:3001/asistencia",
          { username: getCredenciales().username, curso_id: getCursos()[0].curso_id }
        );
        if (response.code === "SUCCESS") {
          setTimeout(alert(response.code), 1);
        } else if (response.code === "FAIL" || response.code === "ERROR") {
          setTimeout(alert(response.code), 1);
        }
      } catch (error) {
        console.error("" + error);
        setTimeout(alert(error + ""), 1);
        return;
      }
    }

  }

}

export default Cards;
