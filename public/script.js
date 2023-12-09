document.addEventListener("DOMContentLoaded", () => {
  const taskListContainer = document.getElementById("taskList");
  const addTaskForm = document.getElementById("addTaskForm");

  // Cargar tareas al cargar la página
  loadTasks();

  // Agregar evento al formulario para manejar la creación de nuevas tareas
  addTaskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;

    // Validar que se ingresó un título antes de agregar la tarea
    if (taskTitle.trim() !== "") {
      await addTask(taskTitle, taskDescription);
      loadTasks(); // Recargar la lista de tareas después de agregar una nueva tarea
      addTaskForm.reset(); // Limpiar el formulario
    } else {
      alert("Por favor, ingrese un título para la tarea.");
    }
  });

  // Delegar eventos de eliminación a los botones "Eliminar"
  taskListContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-task-btn")) {
      const taskId = event.target.dataset.taskId;
      deleteTask(taskId);
    }
  });

  // Función para cargar tareas desde el backend y mostrarlas en la interfaz
  async function loadTasks() {
    taskListContainer.innerHTML = ""; // Limpiar el contenedor antes de cargar las tareas

    const response = await fetch("/tasks");
    const data = await response.json();

    if (data.tasks) {
      data.tasks.forEach((task) => {
        const taskElement = createTaskElement(task);
        taskListContainer.appendChild(taskElement);
      });
    }
  }

  // Función para agregar una nueva tarea al backend
  async function addTask(title, description) {
    const response = await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();
    alert(data.message);
  }

  // Función para borrar una tarea
  async function deleteTask(id) {
    const response = await fetch(`/tasks/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    alert(data.message);

    // Recargar la lista de tareas después de borrar una tarea
    loadTasks();
  }

  // Función para crear un elemento de tarea HTML
  function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description || "Sin descripción"}</p>
      <button class="delete-task-btn" data-task-id="${
        task.id
      }">Eliminar</button>
    `;
    return taskElement;
  }
});
