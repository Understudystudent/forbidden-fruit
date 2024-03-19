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
    const token = req.cookies.userAuthenticated;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                // Token verification failed
                return res.status(401).json({ error: 'Unauthorized' });
            } else {
                // Log the decoded token to inspect its content
                console.log(decodedToken);
                
                // Token is valid, extract user information from the token payload
                const { emailAdd, userRole } = decodedToken;
                // Assuming userRole is 'admin' or 'user', you can perform role-based access control here
                if (userRole === 'admin') {
                    // User is authenticated and is an admin, allow the request to proceed
                    req.user = { emailAdd, userRole };
                    next();
                } else {
                    // User is authenticated but is not an admin, send an error response
                    return res.status(403).json({ error: 'Forbidden' });
                }
            }
        });
    } else {
        // No token provided in the request cookie
        return res.status(401).json({ error: 'Please login.' });
    }
}



export {
    createToken,
    verifyAToken
};
