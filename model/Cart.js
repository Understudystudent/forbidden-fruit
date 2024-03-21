import { connection as db } from "../config/index.js";

class Carts {
    // Fetch cart items for a user
    async getCartItems(req, res) {
        try {
            const userID = req.params.userID;
            const qry = `
                SELECT *
                FROM Cart
                WHERE userID = ?
            `;
            db.query(qry, userID, (err, results) => {
                if (err) {
                    console.error('Error fetching cart items:', err);
                    return res.status(500).json({ status: 500, error: 'Failed to fetch cart items.' });
                }
                res.json({ status: res.statusCode, results });
            });
        } catch (error) {
            console.error('Error fetching cart items:', error);
            res.status(500).json({ status: 500, error: 'Failed to fetch cart items.' });
        }
    }

    // Add item to cart
    async addItem(req, res) {
        try {
            const { userID, itemID, quantity } = req.body;
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
        } catch (error) {
            console.error('Error adding item to cart:', error);
            res.status(500).json({ status: 500, error: 'Failed to add item to cart.' });
        }
    }

    // Update cart item quantity
    async updateCartItem(req, res) {
        try {
            const { userID, itemID } = req.params;
            const { quantity } = req.body;
            const qry = `
                UPDATE Cart
                SET quantity = ?
                WHERE userID = ? AND itemID = ?
            `;
            db.query(qry, [quantity, userID, itemID], (err) => {
                if (err) {
                    console.error('Error updating cart item quantity:', err);
                    return res.status(500).json({ status: 500, error: 'Failed to update cart item quantity.' });
                }
                res.json({
                    status: res.statusCode,
                    msg: 'Cart item quantity updated successfully.'
                });
            });
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
            res.status(500).json({ status: 500, error: 'Failed to update cart item quantity.' });
        }
    }



    // Remove item from cart by cartID
async removeCartItemByCartID(req, res) {
    try {
        const { userID, cartID } = req.params;
        const qry = `
            DELETE FROM Cart
            WHERE userID = ? AND cartID = ?
        `;
        db.query(qry, [userID, cartID], (err) => {
            if (err) {
                console.error('Error removing item from cart:', err);
                return res.status(500).json({ status: 500, error: 'Failed to remove item from cart.' });
            }
            res.json({
                status: res.statusCode,
                msg: 'Item removed from cart successfully.'
            });
        });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ status: 500, error: 'Failed to remove item from cart.' });
    }
}

// Remove item from cart by itemID
async removeCartItemByItemID(req, res) {
    try {
        const { userID, itemID } = req.params;
        const qry = `
            DELETE FROM Cart
            WHERE userID = ? AND itemID = ?
        `;
        db.query(qry, [userID, itemID], (err) => {
            if (err) {
                console.error('Error removing item from cart:', err);
                return res.status(500).json({ status: 500, error: 'Failed to remove item from cart.' });
            }
            res.json({
                status: res.statusCode,
                msg: 'Item removed from cart successfully.'
            });
        });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ status: 500, error: 'Failed to remove item from cart.' });
    }
}

}

export { Carts };
