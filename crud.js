const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModels')
const app = express();

app.use(express.json())
//routes
app.get('/', (req, res)=>{
    res.send('Hello NODE API')
})
app.get('/blog', (req, res)=>{
    res.send('Hello blog my name is Alex')
})

app.post('/product', async(req, res)=>{
   try {
    const product = await Product.create(req.body)
    res.status(200).json(Product);

   } catch (error){
    console.log(error.message);
    res.status(500).json({message: error.message})



   }
})



mongoose.connect('mongodb+srv://admin1:Badsince95@crud-api.vch1toa.mongodb.net/Node1-API?retryWrites=true&w=majority').then(()=> {
    app.listen(3000, ()=> {
        console.log('Node API is running on port 3000')
    })
    console.log('Connected to MongoDb')
}).catch((error)=>{console.log(error)})