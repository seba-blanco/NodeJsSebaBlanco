const {FirestoreContainer} = require ('../../containers/FirestoreContainer')

class ProductsDAOFirestore extends FirestoreContainer {
    constructor(){
        super('products')
         this.id = 0
         this.checkId()
      }

       checkId = async () => {
        let products = await this.getAll()
    
        if(products.length > 0) {
    
          this.id = parseInt(products[products.length - 1].id) + 1
        }
      }

      saveProduct = async (prod) => {
          this.save(prod, this.id);
          this.id++;
      }
}

module.exports = { ProductsDAOFirestore }
