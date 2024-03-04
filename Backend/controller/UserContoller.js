import express from 'express'

const userRouter = express.Router();

// Fetch Users Plural
userRouter.get('/', (req, res)=>{
    try{
        users.fetchUsers(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode, 
            msg: 'Failed to retrieve users'
        })
    }
})

export{
    userRouter, express
}