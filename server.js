const express = require("express");
const app = express();
const PORT = 3001;

// Middleware para manejar JSON
app.use(express.json());

// Base de datos SQLite (instalar sqlite3: npm install sqlite3)
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// Crear tabla de tareas en la base de datos
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, completed BOOLEAN DEFAULT 0)"
  );
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static("public"));

// Endpoint para obtener todas las tareas
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, tasks) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al obtener las tareas." });
    } else {
      res.json({ tasks });
    }
  });
});

// Endpoint para agregar una nueva tarea
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  // Validar que se proporcionó un título para la tarea
  if (!title) {
    return res
      .status(400)
      .json({ error: "El título de la tarea es obligatorio." });
  }

  // Insertar la nueva tarea en la base de datos
  const stmt = db.prepare(
    "INSERT INTO tasks (title, description) VALUES (?, ?)"
  );
  stmt.run(title, description || "");
  stmt.finalize();

  res.json({ message: "Tarea agregada exitosamente." });
});

// Endpoint para eliminar una tarea
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  if (!taskId) {
    return res.status(400).json({ error: "ID de tarea no proporcionado." });
  }

  // Eliminar la tarea de la base de datos
  db.run("DELETE FROM tasks WHERE id = ?", taskId, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al eliminar la tarea." });
    } else {
      res.json({ message: "Tarea eliminada exitosamente." });
    }
  });
});

// Endpoint para marcar una tarea como completada
app.put("/tasks/:id/complete", (req, res) => {
  const taskId = req.params.id;

  if (!taskId) {
    return res.status(400).json({ error: "ID de tarea no proporcionado." });
  }

  // Marcar la tarea como completada en la base de datos
  db.run("UPDATE tasks SET completed = 1 WHERE id = ?", taskId, (err) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error al marcar la tarea como completada." });
    } else {
      res.json({ message: "Tarea marcada como completada exitosamente." });
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor monolítico iniciado en http://localhost:${PORT}`);
});
