import "dotenv/config"
import jwt from "jsonwebtoken";
const {sign, verify} = jwt

function createToken(user){
    return sign({
        emailAdd: user.emailAdd,
        userPwd: user.userPwd
    }, 
    process.env.SECRET_KEY,
    {
        expiresIn: '10m'
    }
    )
}

// function verifyAToken(req, res, next) {
//     const token = req.cookies.userAuthenticated;  // cookie name is 'userAuthenticated'
//     console.log(token);
//     if (token) {
//         jwt.verify(token, process.env.SECRET_KEY, (err) => {
//             if (err) {
//                 res.status(401).json({ error: 'Unauthorized' });
//             } else {
//                 // Token is valid, continue with the request
//                 next();
//             }
//         });
//     } else {
//         res.status(401).json({ error: 'Please login.' });
//     }
// }

// Retrieve a token from the browser
function verifyAToken(req, res, next) {
    const token = req?.headers["authorization"];
    console.log("Received token:", token);

    if (token) {
        try {
            const decodedToken = verify(token, process.env.SECRET_KEY);
            console.log("Decoded token:", decodedToken);
            // If token is valid, attach decoded data to the request object
            req.decodedToken = decodedToken;
            next();
        } catch (error) {
            // Token verification failed
            console.error("Token verification failed:", error);
            res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        // No token provided in the request
        console.log("No token provided in the request.");
        res.status(401).json({ error: 'Please provide a token' });
    }
}



export {
    createToken,
    verifyAToken
}