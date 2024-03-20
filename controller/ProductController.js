import express from 'express'
import bodyParser from 'body-parser'
import { products } from '../model/index.js'

const productRouter = express.Router()

// Fetch all products
productRouter.get('/', (req, res)=>{
    try{
        products.fetchProducts(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve products'
        })
    }
})
productRouter.get('/:id', (req, res)=>{
    try{
        products.fetchProduct(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve a product'
        })
    }
})
productRouter.post('/addProduct', bodyParser.json(), (req, res)=>{
    try{
        products.addProduct(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to add a new product.'
        })
    }
})
productRouter.patch('/update/:id', bodyParser.json(), (req, res)=>{
    try{
        products.updateProduct(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to update a product."
        })
    }
})
productRouter.delete('/delete/:id', (req, res)=>{
    try{
        products.deleteProduct(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to delete a product."
        })
    }
})
export{
    productRouter
}