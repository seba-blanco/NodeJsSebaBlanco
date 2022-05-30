const MongoDBContainer = require('../../containers/MongoDBContainer')
const cartModel = require('../../models/Cart')

class CartsDAOMongo extends MongoDBContainer{
  constructor() {
    super(cartModel);
    this.id = 0
    this.checkId()
  }

    checkId = async () => {
        let products = await this.getAll()

        if(products.length > 0) {

        this.id = parseInt(products[products.length - 1].id) + 1
        }
    }
  
    saveCart = async(obj) => {
        this.save(obj, this.id);
        this.id++;
    }
    
    deleteProdInCart = async (id, id_prod) => {
        let cart = await this.model.find({id:id});
        let index = cart[0].prods.findIndex(prod => prod.id == id_prod);
        cart[0].prods.splice(index,1);
        await this.model.updateOne({id:id}, {prods: cart[0].prods})
    }

    update = async (id, prod) => {
        let cart = await this.model.find({id:id});
        let index = cart[0].prods.findIndex(prod => prod.id == id_prod);
        cart[0].prods.splice(index,1);
        cart[0].prods.push(prod);
        await this.model.updateOne({id:id}, {prods: cart[0].prods})
    }
  

} 

module.exports = { CartsDAOMongo }
