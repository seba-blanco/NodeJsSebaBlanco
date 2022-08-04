const mongoose = require("mongoose");

const cartCollection = 'carts';

const CartSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    timestamp: {type: Number, required: true, default: Date.now()},
    userID: {type: String, required: true, max: 200},
    prods: []
})

const carts = mongoose.model(cartCollection, CartSchema);

module.exports = carts