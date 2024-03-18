import { connection as db } from "../config/index.js";
// import { verifyAToken } from "../middleware/AuthenticateUser.js";

class Cart {
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

    // Check if userID, itemID, and quantity are provided if so go to the next step
    if (!userID || !itemID || !quantity) {
        return res.status(400).json({
            status: 400,
            error: 'Missing required parameters. Please provide userID, itemID, and quantity.'
        });
    }

    // Validating the userID and itemID are numbers if not throw error
    if (isNaN(userID) || isNaN(itemID)) {
        return res.status(400).json({
            status: 400,
            error: 'Invalid userID or itemID. Please provide the correct numbers.'
        });
    }

    // Validating that quantity  is less than or equal to zero
    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
            status: 400,
            error: 'Invalid quantity. Please provide a positive integer.'
        });
    }

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
}

export { Cart };
