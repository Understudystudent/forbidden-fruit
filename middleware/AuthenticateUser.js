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