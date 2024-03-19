import "dotenv/config";
import jwt from "jsonwebtoken";
const { sign } = jwt;

function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userPwd: user.userPwd
    }, 
    process.env.SECRET_KEY,
    {
        expiresIn: '20m'
    }
    );
}

function verifyAToken(req, res, next) {
    const token = req.cookies.userAuthenticated;  // Retrieve the JWT token from the cookie named 'userAuthenticated'
    if (token) {
        // If token exists, verify its authenticity
        jwt.verify(token, process.env.SECRET_KEY, (err) => {
            if (err) {
                // Token verification failed
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                // Token is valid, continue with the request
                next();
            }
        });
    } else {
        // No token provided in the request cookie
        res.status(401).json({ error: 'Please login.' });
    }
}

export {
    createToken,
    verifyAToken
};
