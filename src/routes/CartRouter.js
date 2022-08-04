const express = require('express');

const {Router} = express;

const {cartsDAO} = require("../DAOS/defaultDaos");

const SecurityMiddleware = require("../middlewares/securityMiddleware");

const cartRouter = Router();



//Carrito.
cartRouter.get('/:id/productos',async (req,res) =>{
    
    let car = null;
    
    if (req.params.id && req.params.id != 0) {
        const id = req.params.id;
        car = await cartsDAO.getById(id);
    }
    else {
        car = await cartsDAO.getAll();
        
    }

    if (car) {

        if (car.prods) 
            res.json(car.prods);
        else
            res.json(car);
    }
    else {
        res.json({errorMsg:'cartsDAO no encontrado'});
    }
});



cartRouter.delete("/:id", async (req, res) => {
    
    const id = req.params.id;
    await(cartsDAO.delete(id));
   
    res.json({deletedId: id});
})

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    await(cartsDAO.deleteProdInCart(id, id_prod));
   
    res.json({deletedId: id});
})


cartRouter.post("/", async (req, res) => {
    let newCarrito = await cartsDAO.saveCart(req.body);
    res.json({NewCarrito: newCarrito});
})

cartRouter.post("/:id/productos", async (req, res) => {
    
    let updatedCarrito = await cartsDAO.update(req.params.id, req.body);
    
    if (updatedCarrito)
        res.json({updatedCarrito: updatedCarrito});
    else {
        res.json({errorMsg: "Cart not found"});
    }
})

module.exports = cartRouter;