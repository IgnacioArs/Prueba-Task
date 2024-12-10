const express = require('express');

const cors = require('cors');

const app = express();

//settings
//corre en el puerto 3000
app.set('port',process.env.PORT);


//middlewares
//cors conectar dos servidores para que puedan intercambiar datos
app.use(cors());
//tipos de datos que va enviar es de JSON
app.use(express.json());

//routes
//url de la aplicacion de react
app.use('/Boars', require('./routes/task'));

module.exports = app;