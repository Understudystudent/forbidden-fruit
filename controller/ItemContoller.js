import express from 'express';
import bodyParser from 'body-parser';
import { items } from '../model/index.js';
import { verifyAToken } from "../middleware/AuthenticateUser.js";

const itemRouter = express.Router();

// get Item
itemRouter.get('/', verifyAToken, (req, res) => {
    console.log("Verifying token...");
    console.log("verifyAToken:", verifyAToken);
    try {
        items.fetchItems(req, res);
    } catch (e) {
        console.error("Error fetching items:", e);
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve items'
        });
    }
});

// get Item by ID
itemRouter.get('/:id', (req, res) => {
    try {
        items.fetchItem(req, res);
    } catch (e) {
        console.error("Error fetching item by ID:", e);
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve an item'
        });
    }
});

// Add Item
itemRouter.post('/addItems', bodyParser.json(), (req, res) => {
    try {
        items.addItem(req, res);
    } catch (e) {
        console.error("Error adding item:", e);
        res.json({
            status: res.statusCode,
            msg: 'Failed to add a new item.'
        });
    }
});

// Update Item
itemRouter.patch('/update/:id', bodyParser.json(), (req, res) => {
    try {
        items.updateItem(req, res);
    } catch (e) {
        console.error("Error updating item:", e);
        res.json({
            status: res.statusCode,
            msg: "Failed to update an item."
        });
    }
});

// Delete Item
itemRouter.delete('/delete/:id', (req, res) => {
    try {
        items.deleteItem(req, res);
    } catch (e) {
        console.error("Error deleting item:", e);
        res.json({
            status: res.statusCode,
            msg: "Failed to delete an item."
        });
    }
});

export {
    itemRouter
};
