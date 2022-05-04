const { Console } = require('console');
const fs = require('fs');
const path = require('path');

class Carrito {
    constructor() {
        this.fileName = "carrito.json";
        this.fileContent = [];

    }
        
    readFile = async () => {
     const content =  await fs.promises.readFile(this.fileName,'utf-8')
        .then (contenido => { 
            
           return JSON.parse(contenido);
           
        })
        
        .catch(error => {
        })
        
        return content;
    }


    writeFile =async (data) => {
        
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 4))
        .then(res => {console.log("actualizado")})
        .catch(err => {console.log('no se puedo actualizar', err)})


    }
    

    getCarritos = async () => {
        console.log("entre al get all")
        let datos = await this.readFile().then (prods=> { return prods});
        
        return datos;
    }
    
    getCarritoById =async (id) => {
        console.log("entre al get by id")
        let datos = await this.readFile().then (prods=> {return prods});

        return datos.filter(x=> x.id == id)[0];
    }
    
    AddCarrito =async (object) => {
       
        let datos = await this.readFile().then (carritos=> {return carritos});
        
        let maxId = Math.max(...datos.map(car => car.id), 0);
        object["id"] = maxId + 1;
        object["timestamp"] = Date.now();
        datos.push(object);
       
        this.writeFile(datos);

        return object;


    }

    updateCarrito = async (id, product) => {
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
        // let actualCart = carritos.filter(x=> x.id== id);
       

      
        this.writeFile(carritos);

        return actualCart;


    }

    deleteCarritoById =async(id) => {
        
        let datos = await this.readFile().then (carrito=> {return carrito});
        
        let newData = datos.filter(x=> x.id != id);
        
        this.writeFile(newData);

    }

    deleteProdInCart = async(id, id_prod) => {
        let carrito = await this.readFile().then (carrito=> {return carrito});

        const cartIndex =carrito.findIndex(carrito => carrito.id == id)
        let newData = carrito.filter(x=> x.id== id);
        

        newData[0].prods = newData[0].prods.filter(x=>x.id != id_prod); 
        
        carrito[cartIndex] = newData[0];

        console.log("el muevo carrito");
        console.log(carrito);
        
        this.writeFile(carrito);
    }

    
    deleteAll = async () => {
        console.log("entre al delete all")
        
        this.writeFile([]);
    }
}

module.exports = Carrito;