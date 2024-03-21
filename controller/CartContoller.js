import express from 'express';
import bodyParser from 'body-parser';
import { carts } from '../model/index.js'; 

const cartRouter = express.Router();

// Add item to cart (requires authentication)
cartRouter.post('/add', bodyParser.json(), async (req, res) => {
    try {
        await cart.addItem(req, res);
    } catch (e) {
        console.error('Error adding item to cart:', e);
        res.status(500).json({
            error: 'Failed to add item to cart.'
        });
    }
});

cartRouter.get('/:userID', async (req, res) => {
    try {
        await carts.getCartItems(req, res); // Use the getCartItems method of the Carts class
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ status: 500, error: 'Failed to fetch cart items.' });
    }
});

// Update cart item quantity (requires authentication)
cartRouter.patch('/update/:userID/:itemID', bodyParser.json(), async (req, res) => {
    try {
        await cart.updateCartItem(req.params.userID, req.params.itemID, req.body.quantity);
        res.json({
            message: 'Cart item quantity updated successfully.'
        });
    } catch (e) {
        console.error('Error updating cart item quantity:', e);
        res.status(500).json({
            error: 'Failed to update cart item quantity.'
        });
    }
});

// Remove item from cart by cartID
cartRouter.delete('/remove/:userID/cart/:cartID', async (req, res) => {
    try {
        await carts.removeCartItemByCartID(req, res); 
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ status: 500, error: 'Failed to remove item from cart.' });
    }
});

// Remove item from cart by itemID
cartRouter.delete('/remove/:userID/item/:itemID', async (req, res) => {
    try {
        await carts.removeCartItemByItemID(req, res); 
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ status: 500, error: 'Failed to remove item from cart.' });
    }
});

export { cartRouter };
