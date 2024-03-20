import { connection as db } from "../config/index.js";

class Carts {
    // Fetch cart items for a user
    getCartItems(req, res) {
        const userID = req.params.userID;
        const qry = `
            SELECT *
            FROM Cart
            WHERE userID = ?
        `;
        db.query(qry, userID, (err, results) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                results
            });
        });
    }

   // Add item to cart
addItem(req, res) {
    const { userID, itemID, quantity } = req.body;

    // Proceed with adding the item to the cart if user is correct
    const qry = `
        INSERT INTO Cart (userID, itemID, quantity)
        VALUES (?, ?, ?)
    `;
    db.query(qry, [userID, itemID, quantity], (err) => {
        if (err) {
            console.error('Error adding item to cart:', err);
            return res.status(500).json({
                status: 500,
                error: 'Failed to add item to cart. Internal Server Error.'
            });
        }
        res.json({
            status: res.statusCode,
            msg: 'Item added to cart successfully.'
        });
    });
}
    // Update cart item quantity
    updateCartItem(req, res) {
        const { userID, itemID } = req.params;
        const { quantity } = req.body;
        const qry = `
            UPDATE Cart
            SET quantity = ?
            WHERE userID = ? AND itemID = ?
        `;
        db.query(qry, [quantity, userID, itemID], (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: 'Cart item quantity updated successfully.'
            });
        });
    }
    // Remove item from cart
    removeCartItem(req, res) {
        const { userID, itemID } = req.params;
        const qry = `
            DELETE FROM Cart
            WHERE userID = ? AND itemID = ?
        `;
        db.query(qry, [userID, itemID], (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: 'Item removed from cart successfully.'
            });
        });
    }

    // Delete All
}

export { Carts };
