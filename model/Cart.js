import { connection as db } from "../config/index.js";

class Carts {
    // Fetch cart items for a user
    async getCartItems(req, res) {
        try {
            const userID = req.params.userID;
            const qry = `
                SELECT Cart.cartID, Items.itemID, Category, Items.itemName, SUM(Items.itemQuantity) AS itemQuantity, Items.itemAmount, Items.itemUrl, Items.itemDescription
                FROM Cart
                INNER JOIN Items ON Cart.itemID = Items.itemID
                WHERE Cart.userID = ?
                GROUP BY Items.itemID
            `;
            db.query(qry, userID, (err, results) => {
                if (err) {
                    console.error('Error fetching cart items:', err);
                    return res.status(500).json({
                        status: 500,
                        error: 'Failed to fetch cart items.'
                    });
                }
                res.json({
                    status: res.statusCode,
                    results
                });
            });
        } catch (error) {
            console.error('Error fetching cart items:', error);
            res.status(500).json({
                status: 500,
                error: 'Failed to fetch cart items.'
            });
        }
    }
    

    // Add item to cart
    async addItem(req, res) {
        try {
            const {
                userID,
                itemID,
                quantity
            } = req.body;

            // Check if the item already exists in the cart
            const checkQuery = `
                SELECT cartID, quantity
                FROM Cart
                WHERE userID = ? AND itemID = ?
            `;
            db.query(checkQuery, [userID, itemID], (checkErr, checkResults) => {
                if (checkErr) {
                    console.error('Error checking item in cart:', checkErr);
                    return res.status(500).json({
                        status: 500,
                        error: 'Failed to check item in cart. Internal Server Error.'
                    });
                }

                if (checkResults.length > 0) {
                    // Item already exists in the cart, update quantity
                    const existingQuantity = checkResults[0].quantity;
                    const updatedQuantity = existingQuantity + quantity;

                    const updateQuery = `
                        UPDATE Cart
                        SET quantity = ?
                        WHERE userID = ? AND itemID = ?
                    `;
                    db.query(updateQuery, [updatedQuantity, userID, itemID], (updateErr) => {
                        if (updateErr) {
                            console.error('Error updating item quantity in cart:', updateErr);
                            return res.status(500).json({
                                status: 500,
                                error: 'Failed to update item quantity in cart. Internal Server Error.'
                            });
                        }
                        res.json({
                            status: res.statusCode,
                            msg: 'Item quantity in cart updated successfully.'
                        });
                    });
                } else {
                    // Item doesn't exist in the cart, insert new entry
                    const insertQuery = `
                        INSERT INTO Cart (userID, itemID, quantity)
                        VALUES (?, ?, ?)
                    `;
                    db.query(insertQuery, [userID, itemID, quantity], (insertErr) => {
                        if (insertErr) {
                            console.error('Error adding item to cart:', insertErr);
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
            });
        } catch (error) {
            console.error('Error adding item to cart:', error);
            res.status(500).json({
                status: 500,
                error: 'Failed to add item to cart.'
            });
        }
    }

    // Update cart item quantity
    async updateCartItem(req, res) {
        try {
            const {
                userID,
                itemID
            } = req.params;
            const {
                quantity
            } = req.body;
            const qry = `
                UPDATE Cart
                SET quantity = ?
                WHERE userID = ? AND itemID = ?
            `;
            db.query(qry, [quantity, userID, itemID], (err) => {
                if (err) {
                    console.error('Error updating cart item quantity:', err);
                    return res.status(500).json({
                        status: 500,
                        error: 'Failed to update cart item quantity.'
                    });
                }
                res.json({
                    status: res.statusCode,
                    msg: 'Cart item quantity updated successfully.'
                });
            });
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
            res.status(500).json({
                status: 500,
                error: 'Failed to update cart item quantity.'
            });
        }
    }

    // Remove item from cart by cartID
    async removeCartItemByCartID(req, res) {
        try {
            const {
                userID,
                cartID
            } = req.params;
            const qry = `
                DELETE FROM Cart
                WHERE userID = ? AND cartID = ?
            `;
            db.query(qry, [userID, cartID], (err) => {
                if (err) {
                    console.error('Error removing item from cart:', err);
                    return res.status(500).json({
                        status: 500,
                        error: 'Failed to remove item from cart.'
                    });
                }
                res.json({
                    status: res.statusCode,
                    msg: 'Item removed from cart successfully.'
                });
            });
        } catch (error) {
            console.error('Error removing item from cart:', error);
            res.status(500).json({
                status: 500,
                error: 'Failed to remove item from cart.'
            });
        }
    }

    // Remove item from cart by itemID
    async removeCartItemByItemID(req, res) {
        try {
            const {
                userID,
                itemID
            } = req.params;
            const qry = `
                DELETE FROM Cart
                WHERE userID = ? AND itemID = ?
            `;
            db.query(qry, [userID, itemID], (err) => {
                if (err) {
                    console.error('Error removing item from cart:', err);
                    return res.status(500).json({
                        status: 500,
                        error: 'Failed to remove item from cart.'
                    });
                }
                res.json({
                    status: res.statusCode,
                    msg: 'Item removed from cart successfully.'
                });
            });
        } catch (error) {
            console.error('Error removing item from cart:', error);
            res.status(500).json({
                status: 500,
                error: 'Failed to remove item from cart.'
            });
        }
    }
}

export { Carts };
