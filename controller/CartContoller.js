import express from 'express';
import bodyParser from 'body-parser';
import { cart } from '../model/index.js';
import { verifyAToken } from "../middleware/AuthenticateUser.js";

const cartRouter = express.Router();

// Add item to cart (requires authentication)
cartRouter.post('/add', verifyAToken, bodyParser.json(), (req, res) => {
    try {
        cart.addItem(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to add item to cart.'
        });
    }
});

// Get cart items for a user (requires authentication)
cartRouter.get('/:userID', verifyAToken, (req, res) => {
    try {
        cart.getCartItems(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to fetch cart items.'
        });
    }
});

// Update cart item quantity (requires authentication)
cartRouter.patch('/update/:userID/:itemID', verifyAToken, bodyParser.json(), (req, res) => {
    try {
        cart.updateCartItem(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to update cart item quantity.'
        });
    }
});

// Remove item from cart (requires authentication)
cartRouter.delete('/remove/:userID/:itemID', verifyAToken, (req, res) => {
    try {
        cart.removeCartItem(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to remove item from cart.'
        });
    }
});

export { cartRouter };
