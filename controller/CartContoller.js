import express from 'express';
import bodyParser from 'body-parser';
import { cart } from '../model/index.js';
import { verifyAToken } from '../middleware/AuthenticateUser.js';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
    try {
        res.status(200).json({ message: 'Welcome to the cart!' });
    } catch (error) {
        console.error('Error fetching cart information:', error);
        res.status(500).json({ error: 'Failed to fetch cart information.' });
    }
});


// Add item to cart
cartRouter.post('/add', 
[bodyParser.json(), verifyAToken], async (req, res) => {
    try {
        await cart.addItem(req, res);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ status: res.statusCode, error: 'Failed to add item to cart.' });
    }
});

// Get cart items for a user
cartRouter.get('/:userID', verifyAToken, async (req, res) => {
    try {
        await cart.getCartItems(req, res);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ status: res.statusCode, error: 'Failed to fetch cart items.' });
    }
});

// Update cart item quantity
cartRouter.patch('/update/:userID/:itemID',
 [bodyParser.json(), verifyAToken], async (req, res) => {
    try {
        await cart.updateCartItem(req, res);
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ status: res.statusCode, error: 'Failed to update cart item quantity.' });
    }
});

// Remove item from cart by cartID

cartRouter.delete('/remove/:userID/:cartID', verifyAToken, async (req, res) => {
    try {
        await cart.removeCartItemByCartID(req, res);
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ status: res.statusCode, error: 'Failed to remove item from cart.' });
    }
});

// Remove item from cart by itemID
cartRouter.delete('/removeItem/:userID/:itemID', verifyAToken, async (req, res) => {
    try {
        await cart.removeCartItemByItemID(req, res);
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ status: res.statusCode, error: 'Failed to remove item from cart.' });
    }
});


export { cartRouter };