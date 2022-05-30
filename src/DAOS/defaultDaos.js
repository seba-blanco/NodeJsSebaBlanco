let { DEFAULTSTORE } = require('../config/global')
const {defaultProds} =  require('../DAOS/products/ProductsDAOFirestore');
const {defaultCart} = require(`./carts/cartsDAO${DEFAULTSTORE}.js`)
const {ProductsDAOFirestore} =  require(`./Products/ProductsDAO${DEFAULTSTORE}.js`)



module.exports ={defaultProds, ProductsDAOFirestore}