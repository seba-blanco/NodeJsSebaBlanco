// const MONGO_URI ='mongodb+srv://UserAdmin:admin.blanco@fake-ecommerce.mrdeon7.mongodb.net/?retryWrites=true&w=majority';

const mongoose = require('mongoose')
const { MONGO_URI } = require('../config/global');

class MongoDBContainer {
  constructor(model) {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, () => console.log('Connected'))

    this.model = model;
  }

   getAll = async() =>{
    let datos  = await this.model.find({});
   
    return datos;
  }

   getById = async(id) => {
    let datos  = await this.model.find({"id": id});
   
    return datos;
   }

   update = async (prod, id) => {
       prod = await this.model.updateOne({id: id}, {$set: prod})
   }

   delete = async (id) => {
       await this.model.deleteOne({id: id})
   }

   save = async (prod, id) => {
       prod['id'] = id;
       return await this.model.create(prod);
   }

}

module.exports = MongoDBContainer;
