import express from 'express';
import bodyParser from 'body-parser';
import { cart } from '../model/index.js';

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

// Get cart items for a user (requires authentication)
cartRouter.get('/:userID', async (req, res) => {
    try {
        const cartItems = await cart.getCartItems(req.params.userID);
        res.json(cartItems);
    } catch (e) {
        console.error('Error fetching cart items:', e);
        res.status(500).json({
            error: 'Failed to fetch cart items.'
        });
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

// Remove item from cart (requires authentication)
cartRouter.delete('/remove/:userID/:itemID', async (req, res) => {
    try {
        await cart.removeCartItem(req.params.userID, req.params.itemID);
        res.json({
            message: 'Item removed from cart successfully.'
        });
    } catch (e) {
        console.error('Error removing item from cart:', e);
        res.status(500).json({
            error: 'Failed to remove item from cart.'
        });
    }
});

export { cartRouter };
