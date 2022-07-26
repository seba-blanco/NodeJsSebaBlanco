const express = require('express');

const port= 8080;

const app = express();
const routerProducts = require("./src/routes/ProductRouter");

const routerCarrito = require("./src/routes/CartRouter");
//este es un comentario para ver si cambioo


const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarrito);

const server =app.listen(port, () => {

    console.log(`servidor http escuchando en el puerto ${server.address().port} `)
})

server.on("error", error => console.log(`Error en servidor ${error}`));
