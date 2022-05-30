const {FirestoreContainer} = require ('../../containers/FirestoreContainer')

class CartsDAOFirestore extends FirestoreContainer {
    constructor(){
        super('carts')
         this.id = 0
         this.checkId()
      }

       checkId = async () => {
        let carts = await this.getAll()
    
        if(carts.length > 0) {
    
          this.id = parseInt(carts[carts.length - 1].id) + 1
        }
      }
   
      saveCart = async (cart) => {
          this.save(cart, this.id);
          this.id++;
      }
}

module.exports = { CartsDAOFirestore }
