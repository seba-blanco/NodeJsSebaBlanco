const express = require('express');
const {Router} = express;

const Contenedor = require("./contenedorAsync");
const Carrito = require("./CarritoAsync");
const port= 8080;

const app = express();
const router = Router();
const routerCarrito = Router();


const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/productos", router);
app.use("/api/carrito", routerCarrito);


const archivo = new Contenedor('./products.json');
const carrito = new Carrito();

const server =app.listen(port, () => {

    console.log(`servidor http escuchando en el puerto ${server.address().port} `)
})

server.on("error", error => console.log(`Error en servidor ${error}`));

function SecurityMiddleware(req,res,next) {
    
    let admin = req.headers.admin;

    if(admin) {
        next();
    } else {
        res.json({error: -1, descripcion:`ruta ${req.originalUrl}  y metodo ${req.method}  no permitidos`});
    }

    //next();
}



//get product by id.
router.get('/:id?',async (req,res) =>{
    
    let prods = null;
    
    if (req.params.id) {
        const id = req.params.id;
        prods = await archivo.getById(id);
    }
    else {
        prods = await archivo.getAll();
    }
   
    if (Object.entries(prods).length === 0) 
        res.json({errorMsg:'el objeto esta vacio'})
    else 
        res.json(prods);
})


//add product to products.json
router.post("/", SecurityMiddleware, async (req, res) => {
    
    let newProduct = await archivo.save(req.body);
    res.json({newProduct: newProduct});
})


//modify by ID
router.put("/:id", SecurityMiddleware, async (req, res) => {
    const id = req.params.id;
    let newProduct = await archivo.update(id, req.body);
   
    res.json({newProduct: newProduct});
})


//Delete by ID
router.delete("/:id", SecurityMiddleware, async (req, res) => {
    
    const id = req.params.id;
    await(archivo.deleteById(id));
   
    res.json({deletedId: id});
})



//Carrito.
routerCarrito.get('/:id/productos',async (req,res) =>{
    
    let car = null;
    
    if (req.params.id && req.params.id != 0) {
        const id = req.params.id;
        car = await carrito.getCarritoById(id);
    }
    else {
        car = await carrito.getCarritos();
    }
    if (car) {
        res.json(car.prods)
    }
    else {
        res.json({errorMsg:'Carrito no encontrado'})
    }
    ;
})



routerCarrito.delete("/:id", async (req, res) => {
    
    const id = req.params.id;
    await(carrito.deleteCarritoById(id));
   
    res.json({deletedId: id});
})

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
    
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    await(carrito.deleteProdInCart(id, id_prod));
   
    res.json({deletedId: id});
})


routerCarrito.post("/", async (req, res) => {
    
    let newCarrito = await carrito.AddCarrito(req.body);
    res.json({NewCarrito: newCarrito});
})

routerCarrito.post("/:id/productos", async (req, res) => {
    
    let updatedCarrito = await carrito.updateCarrito(req.params.id, req.body);
    
    if (updatedCarrito)
        res.json({updatedCarrito: updatedCarrito});
    else {
        res.json({errorMsg: "Cart not found"});
    }
})