import {connection as db} from "../config/index.js"

class Products{
    // Mulitple Products
    fetchProducts(req, res){
        const qry = `
        SELECT prodID, prodName, prodQuantity,
        prodAmount, prodUrl,Category, prodDescription
        FROM Products;
        `
        db.query(qry, (err, results)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode,
                results
            })
        })
    }

    // Single Product
    fetchProduct(req, res){
        const qry = `
        SELECT prodID, prodName, prodQuantity,
        prodAmount, prodUrl,Category ,prodDescription
        FROM Products
        WHERE prodID = ${req.params.id};
        `
        db.query(qry, (err, result)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode,
                result: result[0]
            })
        })
    }

    // Add Prodduct
    addProduct(req, res) {
        const qry = `
        INSERT INTO Products
        SET ?;
        `
        db.query(qry, [req.body], (err)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode, 
                msg: 'New product was added'
            })
        })
    }

    // Update Product
    updateProduct(req, res) {
        const qry = `
        UPDATE Products
        SET ?
        WHERE prodID = ${req.params.id};
        `
        db.query(qry, [req.body], (err)=>{
            if(err) throw err
            res.json({
                status: res.statusCode, 
                msg: "The product information has been updated."
            })
        })
    }

    // Delete Product
    deleteProduct(req, res) {
        const qry = `
        DELETE FROM Products
        WHERE prodID = ${req.params.id};
        `
        db.query(qry, (err)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode, 
                msg: "The product information has been deleted."
            })
        })
    }

}

export {
    Products
}