const express = require('express');

const {Router} = express;

const Contenedor = require("../models/contenedorAsync");
const SecurityMiddleware = require("../middlewares/securityMiddleware");
const archivo = new Contenedor();
const productsRouter = Router();




//get product by id.
productsRouter.get('/:id?',async (req,res) =>{
    
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
productsRouter.post("/", SecurityMiddleware, async (req, res) => {
    
    let newProduct = await archivo.save(req.body);
    res.json({newProduct: newProduct});
})


//modify by ID
productsRouter.put("/:id", SecurityMiddleware, async (req, res) => {
    const id = req.params.id;
    let newProduct = await archivo.update(id, req.body);
   
    res.json({newProduct: newProduct});
})


//Delete by ID
productsRouter.delete("/:id", SecurityMiddleware, async (req, res) => {
    
    const id = req.params.id;
    await(archivo.deleteById(id));
   
    res.json({deletedId: id});
});

module.exports = productsRouter;