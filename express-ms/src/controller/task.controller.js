const taskController = {};
const Task = require('../models/task');

// Obtener todas las tareas
taskController.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found' });
        }
        res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Crear una nueva tarea
taskController.createTask = async (req, res) => {
    try {
        const { name, stage } = req.body;

        if (!name || !stage) {
            return res.status(400).json({ message: 'Name and stage are required' });
        }

        const newTask = await Task.create({ name, stage });

        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating task' });
    }
};

// Obtener una tarea específica por ID
taskController.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Actualizar una tarea por ID
taskController.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, stage } = req.body;

        if (!stage) {
            return res.status(400).json({ message: 'Name and stage are required' });
        }else if(stage > 3){
            return res.status(400).json({ message: 'No hay requisitos para el cuerpo de la respuesta.' });
        }

        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.name = name;
        task.stage = stage;
        await task.save();

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating task' });
    }
};

// Eliminar una tarea por ID
taskController.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting task' });
    }
};

module.exports = taskController;
