import {connection as db} from "../config/index.js"

class Products{
    // Mulitple Products
    fetchProducts(req, res) {
        const qry = `
            SELECT prodID, prodName, prodQuantity,
            prodAmount, prodUrl, Category, prodDescription
            FROM Products;
        `;
        db.query(qry, (err, results) => {
            if (err) {
                console.error('Error fetching products:', err);
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

    fetchProduct(req, res) {
        const qry = `
            SELECT prodID, prodName, prodQuantity,
            prodAmount, prodUrl, Category, prodDescription
            FROM Products
            WHERE prodID = ?;
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

    // Add Prodduct
    addProduct(req, res) {
        const qry = `INSERT INTO Products SET ?`
        db.query(qry, [req.body], (err)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode, 
                msg: 'New product was added'
            })
        })
    }

    // Update Product
    async updateProduct(req, res) {
        let data = req.body;

        // Database Query
        const qry = `
            UPDATE Products
            SET ?
            WHERE prodID = ${req.params.id};
        `;
        // Databse Query
        db.query(qry, [data,], (err) => {
            if (err) {
                console.error('Error updating Products:', err);
                res.status(500).json({
                    status: 500,
                    msg: 'Failed to update Product. Internal Server Error.'
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
    async deleteProduct(req, res) {
        let data = req.body;
        const qry = `
            DELETE FROM Products
            WHERE prodID = ${req.params.id};  
        `;
        db.query(qry, [data], (err) => {
            if (err) {
                console.error('Error deleting product:', err);
                res.status(500).json({
                    status: 500,
                    msg: 'Failed to delete product. Internal Server Error.'
                });
                
            } else {
                res.status(200).json({
                    status: 200,
                    msg: 'Product deleted successfully.'
                });
            }
        });
    }

}

export {
    Products
}