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
    
          this.id = parseInt(Math.max(...carts.map(cart => cart.id), 0)) + 1
        }
      }
   
      saveCart = async (cart) => {
          this.save(cart, this.id);
          this.id++;
      }

      deleteProdInCart = async (id, id_prod) => {

        let cart = this.collection.doc(`${id}`);
        let carrito = await cart.get();
        let cartData = carrito.data();
        let index = cartData.prods.findIndex(e => e.id == id_prod);
        cartData.prods.splice(index, 1);
        await cart.update(cartData);
    }

    update = async (id, prod) => {

      
        let cart = this.collection.doc(`${id}`);
        let carrito = await cart.get();
        let cartData = carrito.data();
        
        let index = cartData.prods.findIndex(e => e.id == prod.id);
        if (index > -1) cartData.prods.splice(index, 1);
        
        cartData.prods.push(prod);
        await cart.update(cartData);

        return cartData;
    }
  
}

module.exports = { CartsDAOFirestore }
