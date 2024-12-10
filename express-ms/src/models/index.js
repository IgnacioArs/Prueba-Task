const { Sequelize, DataTypes } = require('sequelize');

// Conectar con la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // El archivo SQLite se almacenará en el mismo directorio
});

// Verificar la conexión
sequelize.authenticate()
  .then(() => console.log('Conexión con la base de datos establecida correctamente.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

// Exportar la conexión y los modelos
module.exports = { sequelize, DataTypes };
