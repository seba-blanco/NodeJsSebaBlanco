const fs = require('fs');
const path = require('path');

class contenedor {
    constructor() {
        this.fileName = "./src/data/products.json";
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
    

    getAll = async () => {
        console.log("entre al get all")
        let datos = await this.readFile().then (prods=> { return prods});
        
        return datos;
    }
    
    getById =async (id) => {
        console.log("entre al get by id")
        let datos = await this.readFile().then (prods=> {return prods});

        console.log("esto es datos");
        console.log(datos);
        return datos.filter(x=> x.id == id);
    }
    
    save =async (object) => {
        console.log("datos get by id")
        let datos = await this.readFile().then (prods=> {return prods});
        console.log(datos)
        let maxId = Math.max(...datos.map(prod => prod.id), 0);
        object["id"] = maxId + 1;
        object["timestamp"] = Date.now();
        datos.push(object);
       
        this.writeFile(datos);

        return object;


    }

    update = async (id, product) => {
        let datos = await this.readFile().then (prods=> {return prods});
        
        let newData = datos.filter(x=> x.id != id);

        product["id"] = id;

        newData.push(product);
       
        this.writeFile(newData);

        return product;


    }

    deleteById =async(id) => {
        
        let datos = await this.readFile().then (prods=> {return prods});
        
        let newData = datos.filter(x=> x.id != id);
        
      
        this.writeFile(newData);

    }

    
    deleteAll = async () => {
        console.log("entre al delete all")
        
        this.writeFile([]);
    }
}

module.exports = contenedor;