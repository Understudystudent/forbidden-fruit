import express from 'express'
import bodyParser from 'body-parser'
import { items } from '../model/index.js'


const itemRouter = express.Router()


// get Item
itemRouter.get('/', (req, res)=>{
    try{
        items.fetchItems(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve items'
        })
    }
})

// get Item by ID
itemRouter.get('/:id', (req, res)=>{
    try{
        items.fetchItem(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve a item'
        })
    }
})

// Add Item
itemRouter.post('/addItems', bodyParser.json(), (req, res)=>{
    try{
        items.addProduct(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to add a new Item.'
        })
    }
})

// Update Item
itemRouter.patch('/update/:id', bodyParser.json(), (req, res)=>{
    try{
        items.updateItem(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to update a Item."
        })
    }
})

// Delete Product
itemRouter.delete('/delete/:id', (req, res)=>{
    try{
        items.deleteItem(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to delete a Item."
        })
    }
})

export {
    itemRouter
}