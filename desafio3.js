const Contenedor =require("./clase");//traigo la clase contenedor con sus metodos.
const express = require('express')

const contenedor = new Contenedor ("productos.txt")

const app = express()

app.get('/', (req, res) => {
    res.send('Hi Express Server!')
});

app.get('/productos',async (req,res)=>{
    const allProducts= await contenedor.getAll();
    res.send(allProducts);
});


app.get('/productoRandom',async (req,res)=>{
    const allProducts= await contenedor.getAll();
    //constante de mi Id maximo segun el largo del array de productos
    const maxId = allProducts.length;

    //el numero sera siempre entre 1 y el id maximo del array    
    const randomNumber = generateRandomNumber(1,maxId);
    const randomProduct = await contenedor.getById(randomNumber)//paso ese numero como parametro del metodo.
    res.send(`${randomProduct}`);
});



//funcion que genera un numero entre un minimo y un maximo
const generateRandomNumber = (min, max) => {
    
   return Math.floor((Math.random() * (max+1 -min)) +min);
    
}


const PORT = process.env.PORT||8080

const server = app.listen(PORT, ()=>{
    console.log(
        `servidos http escuchando en el puerto ${PORT}`
    )
})