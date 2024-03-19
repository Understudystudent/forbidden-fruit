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

function verifyAToken(req, res, next) {
    // Retrieve a token from the browser
    const token = req?.headers['Authorization'];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res?.json({
                    status: res.statusCode,
                    msg: "Token verification failed. Please provide the correct credentials."
                });
            } else {
                next();
            }
        });
    } else {
        res?.json({
            status: res.statusCode,
            msg: "Please provide a token."
        });
    }
}
export {
    createToken,
    verifyAToken
}