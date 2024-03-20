import express from 'express';
import bodyParser from 'body-parser';
import { users } from '../model/index.js';
import { verifyAToken } from "../middleware/AuthenticateUser.js";

const userRouter = express.Router();

// Fetch Users Plural
userRouter.get('/', verifyAToken, (req, res) => {
    try {
        users.fetchUsers(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve users'
        });
    }
});

// Fetch user Single
userRouter.get('/:id', verifyAToken, (req, res) => {
    try {
        users.fetchUser(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve a user'
        });
    }
});

// Add a user
userRouter.post('/register',  bodyParser.json(), (req, res) => {
    try {
        users.createUser(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to add a new user.'
        });
    }
});

// Update User
userRouter.patch('/update/:id', verifyAToken, bodyParser.json(), (req, res) => {
    try {
        users.updateUser(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to update a user"
        });
    }
});

// Delete User
userRouter.delete('/delete/:id', verifyAToken, (req, res) => {
    try {
        users.deleteUser(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to delete a user."
        });
    }

});

// Login
userRouter.post('/login', bodyParser.json(), (req, res) => {
    try {
        users.login(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to log in"
        });
    }
});

export { userRouter };
