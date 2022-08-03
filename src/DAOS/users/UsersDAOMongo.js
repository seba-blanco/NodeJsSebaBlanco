const MongoDBContainer = require('../../containers/MongoDBContainer')
const userModel = require('../../models/Users')

class UsersDAOMongo extends MongoDBContainer{
  constructor() {
    super(userModel);
    this.id = 0;
    this.checkId();
  }

  checkId = async () => {
    let products = await this.getAll()

    if(products.length > 0) {

      this.id = parseInt(Math.max(...products.map(prod => prod.id), 0)) + 1
    }
  }
  
  saveProduct = async(obj) => {
    this.save(obj, this.id);
    this.id++;
  }
  
  

} 

module.exports = { UsersDAOMongo }
