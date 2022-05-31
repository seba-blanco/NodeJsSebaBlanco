let { DEFAULTSTORE } = require('../config/global')
const {ProductsDAOFirestore} =  require('../DAOS/products/ProductsDAOFirestore');
const {ProductsDAOFile} =  require('../DAOS/products/ProductsDAOFile');
const {ProductsDAOMongo} =  require('../DAOS/products/ProductsDAOMongo');

const {CartsDAOFirestore} =  require('../DAOS/carts/cartsDAOFirestore');
const {cartsDAOFile} =  require('../DAOS/carts/cartsDAOFile');
const {CartsDAOMongo} =  require('../DAOS/carts/cartsDAOMongo');

let productsDAO;
let cartsDAO;

console.log('default store');
console.log(DEFAULTSTORE);
switch (DEFAULTSTORE) {
    case 'MongoDB':
        cartsDAO = new CartsDAOMongo();
        productsDAO = new ProductsDAOMongo();
        break;
   
    case 'Firestore':
        cartsDAO = new CartsDAOFirestore();
        productsDAO = new ProductsDAOFirestore();
        break;
        
    default:
        cartsDAO = new cartsDAOFile();
        productsDAO = new ProductsDAOFile();
        break;
}

module.exports ={productsDAO, cartsDAO}