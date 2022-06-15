const Contenedor = require('./Contenedor');
const express = require('express');
const { get } = require('mercadopago/lib/resources/payment');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


let archivo = new Contenedor('./des.json')

let objeto1 = {
    title: 'objeto1',
    price: 200
}
let objeto2 = {
    title: 'objeto2',
    price: 200
}
let objeto3 = {
    title: 'objeto3',
    price: 200
}

// archivo.getAll()
// archivo.save(objeto1)
// archivo.save(objeto2)
// archivo.save(objeto3)
// archivo.deleteById(3)
// archivo.getById(6)
// archivo.deleteAll()

app.get('/productos', (req, res)=>{
    let productos = archivo.getAll()
    res.send (productos)

})
app.get('/productoRandom', (req, res)=>{
    let productos = archivo.getAll();
    let random = Math.floor(Math.random()*productos.length);
    res.send (productos[random])

})

app.listen(port, ()=>{
    console.log('Listening on port 8080')
})
