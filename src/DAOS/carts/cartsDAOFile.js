const {FileContainer} = require ('../../containers/FileContainer');

class cartsDAOFile extends FileContainer {
    constructor() {
        super('./src/data/carrito.json');
        
    }

    update = async (id, product) => {
        let carritos = await this.readFile().then (carritos=> {return carritos});
        
        
        let actualCart =carritos.filter(carrito => carrito.id == id)[0];
      
        if (!actualCart) return null;

        const prodIndex = actualCart.prods.findIndex(prod=> prod.id == product.id);
       
        const cartIndex = carritos.findIndex(carrito=> carrito.id == id);
        
        if (prodIndex === -1)
            actualCart.prods.push(product);
        else {
            actualCart.prods[prodIndex] = {
                ...actualCart.prods[prodIndex],
                stock: actualCart.prods[prodIndex].stock + product.stock};
                
            }
        
        carritos[cartIndex] = actualCart;

        this.writeFile(carritos);

        return actualCart;


    }

    deleteProdInCart = async(id, id_prod) => {
        let carrito = await this.getAll().then (carrito=> {return carrito});

        const cartIndex =carrito.findIndex(carrito => carrito.id == id)
        let newData = carrito.filter(x=> x.id== id);
        

        newData[0].prods = newData[0].prods.filter(x=>x.id != id_prod); 
        
        carrito[cartIndex] = newData[0];

        console.log("el muevo carrito");
        console.log(carrito);
        
        this.save(carrito);
    }

    getById =async (id) => {
        console.log("entre al get by id")
        let datos = await this.readFile().then (prods=> {return prods});

        return datos.filter(x=> x.id == id)[0];
    }
}

module.exports = {cartsDAOFile} 