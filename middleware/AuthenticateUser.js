import "dotenv/config";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { createToken } from "./createToken"; // Import the function to create a token

const router = Router();
const { sign, verify } = jwt;

// Function to create a token
function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userPwd: user.userPwd
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '10m'
    });
}

// Middleware to verify a token
function verifyAToken(req, res, next) {
    const token = req.cookies.userAuthenticated; // Cookie name is 'userAuthenticated'
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

// Route to handle protected requests
router.get('/protected-route', verifyAToken, (req, res) => {
    // Only reachable if the token is successfully verified
    res.json({ message: 'Access granted!' });
});

export default router;
