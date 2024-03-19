import { connection as db } from "../config/index.js";
import { hash, compare } from 'bcrypt';
import { createToken } from "../middleware/AuthenticateUser.js";

class Users {
    // Fetch all users
    fetchUsers(req, res) {
        const qry = `
            SELECT userID, firstName, lastName, 
            userAge, Gender, emailAdd, userPwd, userRole,
            userProfile, userImg, address, number
            FROM Users;
        `;
        db.query(qry, (err, results) => {
            if (err) {
                console.error('Error fetching users:', err);
                res.status(500).json({
                    status: 500,
                    error: 'Internal Server Error'
                });
            } else {
                res.json({
                    status: res.statusCode,
                    results
                });
            }
        });
    }

    // Fetch a single user
    fetchUser(req, res) {
        const qry = `
            SELECT userID, firstName, lastName, 
            userAge, Gender, emailAdd, userPwd, userRole,
            userProfile, userImg, address, number
            FROM Users
            WHERE userID = ${req.params.id};
            `;

            db.query(qry, (err, result)=>{
                if (err) {
                console.error('Error fetching user:', err);
                res.status(500).json({
                    status: 500,
                    error: 'Internal Server Error'
                });
            } else {
                res.json({
                    status: res.statusCode,
                    result: result[0]
                });
            }
        });
    }

    // Create a new user
    async createUser(req, res) {
        let data = req.body;
        try {
            data.userPwd = await hash(data.userPwd, 9);
            const qry = `INSERT INTO Users SET ?`;
            db.query(qry, [data], (err) => {
                if (err) {
                    console.error('Error creating user:', err);
                    res.status(500).json({
                        status: 500,
                        error: 'Internal Server Error'
                    });
                } else {
                    let user = {
                        emailAdd: data.emailAdd,
                        userPwd: data.userPwd
                    };
                    let token = createToken(user);
                    res.json({
                        status: res.statusCode,
                        token,
                        msg: 'You\'re registered'
                    });
                }
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({
                status: 500,
                error: 'Internal Server Error'
            });
        }
    }

    // Update user information
    async updateUser(req, res) {
        const data = req.body;
        try {
            if (data.userPwd) {
                data.userPwd = await hash(data.userPwd, 8);
            }
            const qry = `UPDATE Users SET ? WHERE userID = ?`;
            db.query(qry, [data, req.params.id], (err) => {
                if (err) {
                    console.error('Error updating user:', err);
                    res.status(500).json({
                        status: 500,
                        error: 'Internal Server Error'
                    });
                } else {
                    res.json({
                        status: res.statusCode,
                        msg: 'The user information is updated.'
                    });
                }
            });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({
                status: 500,
                error: 'Internal Server Error'
            });
        }
    }

    // Delete a user
    deleteUser(req, res) {
        const qry = `DELETE FROM Users WHERE userID = ?`;
        db.query(qry, [req.params.id], (err) => {
            if (err) {
                console.error('Error deleting user:', err);
                res.status(500).json({
                    status: 500,
                    error: 'Internal Server Error'
                });
            } else {
                res.json({
                    status: res.statusCode,
                    msg: 'The user information has been removed.'
                });
            }
        });
    }

    // User login
login(req, res) {
    const { emailAdd, userPwd } = req.body;
    const qry = `
        SELECT userID, firstName, lastName, 
        userAge, Gender, emailAdd, userPwd, userRole,
        userProfile, userImg, address, number
        FROM Users
        WHERE emailAdd = ?;
    `;
    db.query(qry, [emailAdd], async (err, result) => {
        if (err) {
            console.error('Error logging in:', err);
            res.status(500).json({
                status: 500,
                error: 'Internal Server Error'
            });
        } else {
            if (!result.length) {
                res.json({
                    status: res.statusCode,
                    msg: 'You provided a wrong email address.'
                });
            } else {
                const validPass = await compare(userPwd, result[0].userPwd);
                if (validPass) {
                    // Include userRole in the token payload
                    const token = createToken({ 
                        emailAdd, 
                        userPwd, 
                        userRole: result[0].userRole 
                    });
                    res.json({
                        status: res.statusCode,
                        msg: 'You\'re logged in',
                        token,
                        result: result[0]
                    });
                } else {
                    res.json({
                        status: res.statusCode,
                        msg: 'Please provide the correct password.'
                    });
                }
            }
        }
    });
}

}

export { Users };
