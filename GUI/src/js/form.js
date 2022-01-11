import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { getRol } from "./../App";

class Formulario extends Component {
    render() {
        return (
            <Form className="formulario-x">
                {getRol() === "ADMIN" ? (
                    <Form.Group>
                        <Form.Label htmlFor="TextInput">Codigo curso</Form.Label>
                        <Form.Control id="TextInput" placeholder="XXXXXXXMG" />
                        <Form.Label htmlFor="Input">Añadir estudiante (Codigo)</Form.Label>
                        <Form.Control id="TextInput" placeholder="2021XXXXX" />
                        <Form.Label htmlFor="Input">Remover estudiante (Codigo)</Form.Label>
                        <Form.Control id="TextInput" placeholder="2021XXXXX" />

                    </Form.Group>
                ) : (
                    <Form.Group>
                        <Form.Label htmlFor="seleccionar">Puntalidad</Form.Label>
                        <Form.Select id="seleccionar">
                            <option>Opcion 1</option>
                        </Form.Select>
                    </Form.Group>
                )}
            </Form>
        );
    }
}

export default Formulario;
