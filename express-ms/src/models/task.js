const { sequelize, DataTypes } = require('./index'); // Importamos la conexión

// Definir el modelo de Task
const Task = sequelize.define('Task', {
  id: {
    autoIncrement: true,  // Hace que el campo 'id' sea autoincremental
    primaryKey: true,     // Establece 'id' como la clave primaria de la tabla
    type: DataTypes.INTEGER, // El tipo de dato será un entero
    allowNull: false      // 'id' no puede ser nulo
  },
  name: {
    type: DataTypes.STRING, // El campo 'name' es de tipo cadena (string)
    allowNull: false        // 'name' no puede ser nulo
  },
  stage: {
    type: DataTypes.INTEGER, // El campo 'stage' es un entero
    allowNull: true,         // 'stage' no puede ser nulo
  },
});

// Verificar la conexión
sequelize.authenticate()
  .then(async () => {
    console.log('Conexión con la base de datos establecida correctamente.');
    
    // Sincronizar la tabla 'Tasks', forzando la recreación (eliminando y volviendo a crear la tabla)
    try {
      await sequelize.sync({ force: true }); // Esto destruirá y recreará todas las tablas definidas en los modelos
      console.log('Tablas creadas o sincronizadas con la base de datos.');
    } catch (error) {
      console.error('Error al sincronizar las tablas:', error);
    }
  })
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

module.exports = Task;

