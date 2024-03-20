import express from 'express';
import bodyParser from 'body-parser';
import { cart } from '../model/index.js';
import { verifyAToken } from '../middleware/AuthenticateUser.js';

const cartRouter = express.Router();

// Add item to cart (requires authentication)
cartRouter.post('/add', verifyAToken, bodyParser.json(), async (req, res) => {
    try {
        // Check if the user is verified
        if (!req.user.verified) {
            return res.status(403).json({ message: 'Unauthorized: User is not verified' });
        }

        await cart.addItem(req, res);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart.' });
    }
});

// Get cart items for a user (requires authentication)
cartRouter.get('/:userID', verifyAToken, async (req, res) => {
    try {
        // Check if the user is verified
        if (!req.user.verified) {
            return res.status(403).json({ message: 'Unauthorized: User is not verified' });
        }

        const cartItems = await cart.getCartItems(req.params.userID);
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Failed to fetch cart items.' });
    }
});

// Update cart item quantity (requires authentication)
cartRouter.patch('/update/:userID/:itemID', verifyAToken, bodyParser.json(), async (req, res) => {
    try {
        // Check if the user is verified
        if (!req.user.verified) {
            return res.status(403).json({ message: 'Unauthorized: User is not verified' });
        }

        await cart.updateCartItem(req.params.userID, req.params.itemID, req.body.quantity);
        res.json({ message: 'Cart item quantity updated successfully.' });
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ error: 'Failed to update cart item quantity.' });
    }
});

// Remove item from cart (requires authentication)
cartRouter.delete('/remove/:userID/:itemID', verifyAToken, async (req, res) => {
    try {
        // Check if the user is verified
        if (!req.user.verified) {
            return res.status(403).json({ message: 'Unauthorized: User is not verified' });
        }

        await cart.removeCartItem(req.params.userID, req.params.itemID);
        res.json({ message: 'Item removed from cart successfully.' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Failed to remove item from cart.' });
    }
});

export { cartRouter };
