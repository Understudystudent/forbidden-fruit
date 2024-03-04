import express from 'express'
import bodyParser from 'body-parser'
import { products } from '../model/Index'

const productRouter = express.Router()


// get product
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

// get product by ID
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

// Add product
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

// Update Product
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

// Delete Product
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

export {
    productRouter
}