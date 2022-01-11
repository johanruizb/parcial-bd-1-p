var express = require("express");
var router = express.Router();

/* POST login listing. */

router.post("/", function (req, respuesta) {

    console.log("XD");

    const { Pool } = require("pg");
    const bcrypt = require("bcrypt");

    const connectionString =
        "postgresql://postgres:jr0237@localhost:5432/posattendace";

    const postgres = new Pool({
        connectionString,
    });

    postgres.connect().catch((error) => {
        console.log("" + error);
        respuesta.send({ code: "ERROR", error, textplain: error + "" });
        respuesta.end();

        return;
    });

    const foo = async () => {
        const username = req.body.username.toString();
        const curso_id = req.body.curso_id.toString();
        const fecha = new Date(Date.now());

        console.log(fecha);

        const text =
            "INSERT INTO Asistencia (curso_id, fecha, codigo_estudiante) VALUES ($1, $2, (SELECT codigo_estudiante FROM Estudiantes WHERE codigo_estudiante = $3))";
        const values = [curso_id, fecha, username];

        try {
            await postgres.query('BEGIN').catch((error) => {
                console.log("" + error);
                respuesta.send({ code: "ERROR", error, textplain: error + "" });
                respuesta.end();

                return;
            });
            const res = await postgres.query(text, values);
            console.log(res);
            await postgres.query('COMMIT');
            return respuesta.send({ code: "SUCCESS" });
        } catch (e) {
            console.log(e);
            return respuesta.send({ code: "FAIL" });
        } finally {
            postgres.end();
        }
    }

    setTimeout(foo, 1);

});

module.exports = router;
