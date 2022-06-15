const instancia = require('./instancia');
const fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    save(objeto) {    
        
        
        try {
            let productos = this.getAll();
            
            if(productos.length >0){
                let idMax = Math.max(...productos.map(producto => producto.id))
                console.log(idMax);
                idMax ++;
                objeto.id = idMax;
                productos.push(objeto)
                fs.writeFileSync('./des.json', JSON.stringify(productos))   


            } else{
                let idInicial = 1; 
                objeto.id = idInicial;
                productos.push(objeto)
                fs.writeFileSync('./des.json', JSON.stringify(productos))                
            }
        

        } catch (err) {
            console.error(`Hubo un error ${err}`)
        }

    }
    getById(id) {
        let productos = this.getAll()
        let producto = productos.find(producto=> producto.id === id)
        console.log(producto);
        return producto;

    }
    getAll() {
        let productos = fs.readFileSync('./des.json', 'utf-8');       
        return JSON.parse(productos);         
    }
    deleteById(numId) {
        let productos = this.getAll();
        try{
        let producto = productos.find(prod => {prod.id === numId})
        if(producto){
            let newProducts = productos.filter(prod => prod.id != numId)
            fs.writeFileSync('./des.json', JSON.stringify(newProducts,null,2))
            return {status:"success",data:null,id:null}
        }else{
            console.log('ese producto no existe');
        }
    } catch(err){        

        return {status:"error",message:err}           
        
    }

    }
    deleteAll() {
        fs.writeFileSync('./des.json',JSON.stringify([],null,2))

    }

}

module.exports = Contenedor;