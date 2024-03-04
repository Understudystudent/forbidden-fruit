import {connection as db} from "../config/index.js"
import {hash, compare} from 'bcrypt'
import { createToken } from "../Middleware/AuthenticateUser.js"

class Users{
    // mulitple Users
    fetchUsers(req, res) {
        const qry = `
        SELECT userID, firstName, lastName,
        userAge, Gender, emailAdd, userRole,userProfile,userImg
        FROM Users;
        `
        db.query(qry, (err, results)=>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                results
            })
        })
    }
    // single User
    fetchUser(req, res) {
        const qry = `
        SELECT userID, firstName, lastName,
        userAge, Gender, emailAdd, userRole,userProfile,userImg
        FROM Users
        WHERE userID =
         ${req.params.id};
        `
        db.query(qry, (err, result)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode,
                result
            })
        })
    }
    // Create a User
    async createUser(req, res) {
        // Payload
        let data = req.body
        data.userPass = await hash(data?.userPass, 8)
        let user = {
            emailAdd: data.emailAdd,
            userPass: data.userPass
        }
        const qry = `
        INSERT INTO Users
        SET ?;
        `     
        db.query(qry, [data], (err)=>{
            if(err) {
                res.json({
                    status: res.statusCode,
                    msg: 'This email address already exist'
                })
            }else {
                // Create a token
                let token = createToken(user)
                res.json({
                    status: res.statusCode,
                    token,
                    msg: 'You\'re registered'
                })
            }
        })   
    }
    // Update User
    async updateUser(req, res) {
        const data = req.body 
        if(data?.userPass){
            data.userPass = await hash(data?.userPass, 8)
        }
            
        const qry = `
        UPDATE Users
        SET ?
        WHERE userID = ${req.params.id};
        `
        db.query(qry, [data], (err)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode,
                msg: "The user information is updated."
            })
        })

    }
    // Delete User
    deleteUser(req, res) {
        const qry = `
        DELETE FROM Users
        WHERE userID = ${req.params.id};
        `
        db.query(qry, (err)=>{
            if(err) throw err 
            res.json({
                status: res.statusCode,
                msg: "The user information has been removed."
            })
        })
    }
    // Login
    login(req, res) {
        const {emailAdd, userPwd} = req.body 
        const qry = `
        SELECT userID, firstName, lastName,
        userAge, Gender, emailAdd, userPwd, userRole,userProfile
        FROM Users
        WHERE emailAdd = '${emailAdd}';
        `
        db.query(qry, async(err, result)=>{
            if(err) throw err 
            if(!result?.length){
                res.json({
                    status: res.statusCode, 
                    msg: "You provided a wrong email address."
                })
            }else {
                // Validate password
                const validPass = await compare(userPwd, result[0].userPwd)
                if(validPass) {
                    const token = createToken({
                        emailAdd, 
                        userPass
                    })
                    res.json({
                        status: res.statusCode,
                        msg: "You're logged in",
                        token, 
                        result: result[0]
                    })
                }else {
                    res.json({
                        status: res.statusCode,
                        msg: "Please provide the correct password."
                    })
                }
            }
        })
    }
}

export {
    Users
}