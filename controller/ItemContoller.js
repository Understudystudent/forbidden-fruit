import express from 'express';
import bodyParser from 'body-parser';
import { items } from '../model/index.js';
import jwt from 'jsonwebtoken';
import { verifyAToken } from '../middleware/AuthenticateUser.js';

const itemRouter = express.Router();

// Get all items
itemRouter.get('/', verifyAToken, async (req, res) => {
    try {
        // Check if the user is verified
        if (!req.user.verified) {
            return res.status(403).json({ message: 'Unauthorized: User is not verified' });
        }

        // Fetch all items
        items.fetchItems(req, res);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Failed to fetch items' });
    }
});

// Get item by ID
itemRouter.get('/:id', async (req, res) => {
    try {
        items.fetchItem(req, res);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Failed to fetch item' });
    }
});

// Add item
itemRouter.post('/addItems', bodyParser.json(), async (req, res) => {
    try {
        items.addItem(req, res);
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ message: 'Failed to add item' });
    }
});

// Update item
itemRouter.patch('/update/:id', bodyParser.json(), async (req, res) => {
    try {
        items.updateItem(req, res);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Failed to update item' });
    }
});

// Delete item
itemRouter.delete('/delete/:id', async (req, res) => {
    try {
        items.deleteItem(req, res);
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Failed to delete item' });
    }
});

export { itemRouter };
