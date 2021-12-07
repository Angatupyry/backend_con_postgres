const express = require("express");
const { verifyToken } = require("../middlewares/jwt-validate");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const tareas = await db.query("select * from tareas");

  res.send({
    tareas: tareas.rows,
  });
});

router.post("/", async (req, res) => {
  const titulo = req.body.titulo;
  const prioridad = req.body.prioridad;

  const nuevaTarea = {
    titulo: titulo,
    prioridad: prioridad,
    autor: req.body.name,
  };

  const resBd = await db.query(
    "Insert into tareas(titulo, prioridad, author_id) values ($1, $2, $3)",
    [nuevaTarea.titulo, nuevaTarea.prioridad, 1]
  );

  res.send({
    tareaNueva: nuevaTarea,
  });
});

module.exports = {
  router: router,
};
