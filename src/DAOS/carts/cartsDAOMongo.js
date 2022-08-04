const MongoDBContainer = require('../../containers/MongoDBContainer')
const cartModel = require('../../models/Cart')

class CartsDAOMongo extends MongoDBContainer{
  constructor() {
    super(cartModel);
    this.id = 0
    this.checkId()
  }

    checkId = async () => {
        let carts = await this.getAll()

        if(carts.length > 0) {

        this.id = parseInt(Math.max(...carts.map(cart => cart.id), 0)) + 1
        }
    }
  
    saveCart = async(obj) => {
        this.save(obj, this.id);
        this.id++;
    }
    
    deleteProdInCart = async (id, id_prod) => {
        let cart = await this.model.find({id:id});
        console.log(cart);
        if (cart.length>0) {
            let index = cart[0].prods.findIndex(prod => prod.id == id_prod);
            if (index > -1) {
                cart[0].prods.splice(index,1);
                await this.model.updateOne({id:id}, {prods: cart[0].prods})
            }
        }
    }

    update = async (id, prod) => {
        let cart = await this.model.find({id:id});
        let index = cart[0].prods.findIndex(prod => prod.id == prod.id);
        console.log(index);
        if (index > 0) cart[0].prods.splice(index,1);
        cart[0].prods.push(prod);
        await this.model.updateOne({id:id}, {prods: cart[0].prods})

        return cart;
    }

    getCartForUser = async(idUser) => {
        let cart = await this.model.findOne({userID: idUser});
        return cart;
    }
    
  

} 

module.exports = { CartsDAOMongo }
