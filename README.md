# Task Management Application

Este proyecto es una aplicación para gestionar tareas, implementada con **Express.js** en el backend y **React.js** en el frontend. La aplicación permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre tareas almacenadas en una base de datos relacional utilizando Sequelize.

## 🚀 Características

- **Crear Tareas**: Agrega nuevas tareas con un nombre y un estado.
- **Visualizar Tareas**: Lista todas las tareas almacenadas.
- **Actualizar Tareas**: Modifica tareas existentes.
- **Eliminar Tareas**: Permite eliminar tareas por ID.
- **Frontend React.js**: Interfaz interactiva para gestionar las tareas.

---

## 📂 Estructura del Proyecto

### Backend

- **Rutas** (`task.routes.js`): Define las rutas RESTful para operaciones CRUD.
- **Controladores** (`task.controller.js`): Contiene la lógica de negocio para interactuar con la base de datos.
- **Modelo** (`task.js`): Estructura y mapeo de tareas a la base de datos utilizando Sequelize.

### Frontend

- **Componentes React**:
  - **KanbanBoard**: Renderiza tareas en formato de tablero visual.
  - **Formulario de Actualización**: Permite a los usuarios editar el nombre o estado de las tareas.

---

## 🛠️ Instalación y Configuración

### Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
