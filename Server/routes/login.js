var express = require("express");
var router = express.Router();

/* POST login listing. */

router.post("/", function (req, res) {
  const { Pool } = require("pg");
  const bcrypt = require("bcrypt");

  const connectionString =
    "postgresql://postgres:jr0237@localhost:5432/posattendace";

  const postgres = new Pool({
    connectionString,
  });

  postgres.connect().catch((error) => {
    console.warn("" + error);
    res.send({ code: "ERROR", error, textplain: error + "" });
    res.end();

    return;
  });

  const username = req.body.username.toString();
  const password = req.body.password.toString();

  if (username.length === 0 || password.length === 0) {
    return res.send({ code: "FAIL", textplain: "ACCESS DENIED" });
  }

  const text =
    "SELECT usuario, contraseña, rol FROM InicioSesion WHERE usuario = $1";
  const values = [username];

  postgres.query(text, values, (err, result) => {
    if (err) {
      console.warn(err.stack);
    } else {
      const user = result.rows[0];

      bcrypt.compare(password, user.contraseña, function (err, isValid) {
        if (err) return res.send({ code: "ERROR", err, textplain: err + "" });
        else if (!isValid)
          return res.send({ code: "FAIL", textplain: "ACCESS DENIED" });

        var tokenGenerated = null;
        if (user.rol == "admin")
          tokenGenerated =
            "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";
        else if ((user.rol = "user"))
          tokenGenerated =
            "04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb";
        else tokenGenerated = "invitado";

        let resultado;

        if (user.rol == "user") {
          const consulta = "SELECT curso_id, curso_nombre FROM Cursos WHERE codigo_estudiante = $1";
          const valor = [username];
          postgres.query(consulta, valor, (err, res1) => {
            if (err)
              return;
            return res.send({
              code: "SUCCESS",
              rol: user.rol.toUpperCase(),
              cursos: res1.rows,
              token: tokenGenerated,
              textplain: "ACCESS GRANTED",
            });
          });
        }
      });
    }
  });
});

module.exports = router;
