    import "dotenv/config";
    import jwt from "jsonwebtoken";

    const { verify } = jwt;

    function verifyAToken(req, res, next) {
        // Retrieve a token from the request headers
        const token = req?.headers['authorization'];
        if (token) {
            try {
                // Verify the token
                const decodedToken = verify(token, process.env.SECRET_KEY);

                // Extract user data from the decoded token
                const userData = {
                    userID: decodedToken.userID,
                    emailAdd: decodedToken.emailAdd,
                    userPwd: decodedToken.userPwd,
                    userRole: decodedToken.userRole,
                    
                };

                // Set a cookie with the user data
                res.cookie('userData', userData, { httpOnly: true });

                next();
            } catch (error) {
                // Handle invalid or expired token
                res.status(401).json({
                    status: res.statusCode,
                    msg: "Please provide the correct credentials."
                });
            }
        } else {
            // No token provided
            res.status(401).json({
                status: res.statusCode,
                msg: "Please login."
            });
        }
    }

    function createToken(user) {
        return jwt.sign(
            {
                emailAdd: user.emailAdd,
                userPwd: user.userPwd
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '10h'
            }
        );
    }

    export { verifyAToken, createToken };
