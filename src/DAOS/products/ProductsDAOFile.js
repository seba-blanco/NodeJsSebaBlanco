const {FileContainer} = require ('../../containers/FileContainer');

class ProductsDAOFile extends FileContainer {
    constructor() {
        super('./src/data/products.json');
        
    }

   
}

module.exports = {ProductsDAOFile} 