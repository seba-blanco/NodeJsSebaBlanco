const fs = require('fs');

class FileContainer {
    constructor(filename) {
        this.fileName = filename;
        this.fileContent = [];

    }
        
    readFile = async () => {
     const content =  await fs.promises.readFile(this.fileName,'utf-8')
        .then (contenido => {  
           return JSON.parse(contenido);  
        })
        
        .catch(error => {
            console.log(`error leyendo archivo ${this.fileName}`);
        })
        
        return content;
    }


    writeFile =async (data) => {
        
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 4))
        .then(res => {console.log("actualizado")})
        .catch(err => {console.log('no se puedo actualizar', err)})


    }
    

    getAll = async () => {
        
        let datos = await this.readFile().then (prods=> { return prods});
        
        return datos;
    }
    
    getById =async (id) => {
        let datos = await this.readFile().then (prods=> {return prods});
        return datos.filter(x=> x.id == id);
    }
    
    save =async (object) => {
        let datos = await this.readFile().then (prods=> {return prods});
        
        let maxId = Math.max(...datos.map(prod => prod.id), 0);
        object["id"] = maxId + 1;
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
          
        this.writeFile([]);
    }
}

module.exports = {FileContainer};