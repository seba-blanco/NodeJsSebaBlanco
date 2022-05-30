const express = require('express');

const {Router} = express;

// const {ProductsDAOFile} = require("../DAOS/products/ProductsDAOFile");
// const archivo = new ProductsDAOFile();


const {ProductsDAOFirestore} = require("../DAOS/defaultDaos");
const archivo = new ProductsDAOFirestore();

const SecurityMiddleware = require("../middlewares/securityMiddleware");
const productsRouter = Router();

// const {ProductsDAOMongo} = require('../DAOS/products/ProductsDAOMongo');
// const archivo = new ProductsDAOMongo();

// const { ProductsDAOFirestore } = require('../DAOS/products/ProductsDAOFirestore');
// const archivo = new ProductsDAOFirestore()

productsRouter.get('/add/', async (req,res) => {
    //INSERT WITH MANUAL IDS
    
        await archivo.saveProduct({
            "name": "calculadora",
            "description": "mira que lindo producto",
            "timestamp": "1651621481714",
            "price": 234.56,
            "photo": "https://via.placeholder.com/15",
            "stock": 5
        });
        
        await archivo.saveProduct({
            "name": "Globo terraqueo",
            "description": "mira que lindo producto",
            "timestamp": "1651621481714",
            "price": 345.67,
            "photo": "https://via.placeholder.com/15",
            "stock": 5
        
        });

        console.log('Datos insertados');

        res.json({ok : "ok"});
})

//get product by id.
productsRouter.get('/:id?', async (req,res) =>{
    
    let prods = null;
    
    if (req.params.id) {
        const id = req.params.id;
        prods = await archivo.getById(id);
    }
    else {
        prods = await archivo.getAll();
        console.log(prods);
    }
   
    if (Object.entries(prods).length === 0) 
        res.json({errorMsg:'el objeto esta vacio'})
    else 
        res.json(prods);
})


//add product to products.json
productsRouter.post("/", SecurityMiddleware, async (req, res) => {
    
    let newProduct = await archivo.saveProduct(req.body);
    res.json({newProduct: newProduct});
})


//modify by ID
productsRouter.put("/:id", SecurityMiddleware, async (req, res) => {
    const id = req.params.id;
    let newProduct = await archivo.update(req.body, id);
   
    res.json({newProduct: newProduct});
})


//Delete by ID
productsRouter.delete("/:id", SecurityMiddleware, async (req, res) => {
    
    const id = req.params.id;
    await(archivo.delete(id));
   
    res.json({deletedId: id});
});

module.exports = productsRouter;