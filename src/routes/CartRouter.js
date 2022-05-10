const express = require('express');

const {Router} = express;

const Carrito = require("../models/CarritoAsync");
const SecurityMiddleware = require("../middlewares/securityMiddleware");

const cartRouter = Router();
const carrito = new Carrito();




//Carrito.
cartRouter.get('/:id/productos',async (req,res) =>{
    
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



cartRouter.delete("/:id", async (req, res) => {
    
    const id = req.params.id;
    await(carrito.deleteCarritoById(id));
   
    res.json({deletedId: id});
})

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    await(carrito.deleteProdInCart(id, id_prod));
   
    res.json({deletedId: id});
})


cartRouter.post("/", async (req, res) => {
    
    let newCarrito = await carrito.AddCarrito(req.body);
    res.json({NewCarrito: newCarrito});
})

cartRouter.post("/:id/productos", async (req, res) => {
    
    let updatedCarrito = await carrito.updateCarrito(req.params.id, req.body);
    
    if (updatedCarrito)
        res.json({updatedCarrito: updatedCarrito});
    else {
        res.json({errorMsg: "Cart not found"});
    }
})

module.exports = cartRouter;