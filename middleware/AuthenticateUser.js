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
export {
    createToken,
    verifyAToken
}