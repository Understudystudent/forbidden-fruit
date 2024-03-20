import {connection as db} from "../config/index.js"

class Items{
    // Mulitple Items
    fetchItems(req, res) {
        const qry = `
            SELECT itemID, itemName, itemQuantity,
            itemAmount, itemUrl, Category, itemDescription
            FROM Items;
        `;
        db.query(qry, (err, results) => {
            if (err) {
                console.error('Error fetching Items:', err);
                res.status(500).json({
                    status: 500,
                    error: 'Internal Server Error'
                });
            } else {
                res.json({
                    status: res.statusCode,
                    results
                });
            }
        });
    }

    fetchItem(req, res) {
        const qry = `
            SELECT itemID, itemName, itemQuantity,
            itemAmount, itemUrl, Category, itemDescription
            FROM Items
            WHERE itemID = ?;
        `;
        db.query(qry, [req.params.id], (err, result) => {
            if (err) {
                console.error('Error fetching product:', err);
                res.status(500).json({
                    status: 500,
                    error: 'Internal Server Error'
                });
            } else {
                res.json({
                    status: res.statusCode,
                    result: result[0]
                });
            }
        });
    }

    // Add Item
    addItem(req, res) {
        const qry = `INSERT INTO Items SET ?`
        db.query(qry, [req.body], (err)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode, 
                msg: 'New Item was added'
            })
        })
    }

    // Update Item
    async updateItem(req, res) {
        let data = req.body;

        // Database Query
        const qry = `
            UPDATE Items
            SET ?
            WHERE itemID = ${req.params.id};
        `;
        // Databse Query
        db.query(qry, [data,], (err) => {
            if (err) {
                console.error('Error updating Items:', err);
                res.status(500).json({
                    status: 500,
                    msg: 'Failed to update Item. Internal Server Error.'
                });
            } else {
                res.status(200).json({
                    status: 200,
                    msg: 'Product updated successfully.'
                });
            }
        });
    }

    // Delete Product
    async deleteItem (req, res) {
        let data = req.body;
        const qry = `
            DELETE FROM Items
            WHERE itemID = ${req.params.id};  
        `;
        db.query(qry, [data], (err) => {
            if (err) {
                console.error('Error deleting Item:', err);
                res.status(500).json({
                    status: 500,
                    msg: 'Failed to delete Item. Internal Server Error.'
                });
                
            } else {
                res.status(200).json({
                    status: 200,
                    msg: 'Item deleted successfully.'
                });
            }
        });
    }

}

export {
    Items
}