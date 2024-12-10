const { Router } = require('express');
const router = Router();

// Importa los métodos del controlador
const {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controller/task.controller');

// Define las rutas REST
router.route('/') 
    .get(getTasks) // Obtener todas las tareas
    .post(createTask); // Crear una nueva tarea

router.route('/:id') 
    .get(getTaskById) // Obtener una tarea específica por ID
    .put(updateTask) // Actualizar una tarea por ID
    .delete(deleteTask); // Eliminar una tarea por ID

module.exports = router;
