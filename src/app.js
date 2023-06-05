import express from 'express';
import { ProductManager } from './ProductManager.js'

const manager = new ProductManager('../products.json');

  

const app = express()

app.use(express.urlencoded({extended:true}))

app.get('/products', async (req,res)=>{
    let limite = req.query.limite
    const productLimitados = await manager.getProducts()

    // const prueba = productLimitados.filter(prodcuto => prodcuto.id <= Number(limite))
     const prueba = productLimitados.slice(0, Number(limite))
  
    if(!limite) res.send(await manager.getProducts())
    else{
         res.send(prueba)
    }

})

app.get('/products/:id', async (req,res)=>{
    const id = req.params.id

    

   
    if (await manager.getProductById(Number(id))==='ERRORR') res.status(400).send({error : "Not Found"})
    else{
        res.send(await manager.getProductById(Number(id)))
    }
})


app.listen(8080, () => console.log('Server Up'))