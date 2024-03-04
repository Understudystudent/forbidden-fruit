import "dotenv/config"
import jwt from "jsonwebtoken";
const {sign, verify} = jwt

// Function to create a JWT token for a user
function createToken(user) {
    try {
        const token = sign(
            {
                emailAdd: user.emailAdd,
                userPwd: user.userPwd
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h'
            }
        );

        return token;
    } catch (error) {
        console.error('Error creating token:', error);
        throw new Error('Token creation failed');
    }
}

// Middleware to verify a JWT token 

function verifyAToken(req, res, next) {
    // Retrieve a token from the browser
    const token = req?.headers['Authorization']
    if(token) {
        if(verify(token, process.env.SECRET_KEY)){
            next()
        }else {
            res?.json({
                status: res.statusCode,
                msg: "Please provide the correct credentials."
            })
        }
    }else {
        res?.json({
            status: res.statusCode,
            msg: "Please login."
        })
    }
}
export {
    createToken,
    verifyAToken
}