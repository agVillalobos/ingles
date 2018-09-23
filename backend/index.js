'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

//conexion a la base de datos.
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/English', { useNewUrlParser: true })
    .then(
        () => {
            console.log("Se ha conectado correctamente a la bd");

            app.listen(port, () => {
                console.log("Servidor corriendo en http://localhost/3800...");
            });
        }
    ).catch(err => console.log(err));