import { connection as db } from "../config/index.js";

class Users {
    // Fetch all users
    fetchUsers(req, res) {
        const qry = `
            SELECT userID, firstName, lastName,
            userAge, Gender, userRole, emailAdd,userProfile,userImg,address,number
            FROM Users;
        `;
        db.query(qry, (err, results) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                results
            });
        });
    }

    // Fetch a single user
    fetchUser(req, res) {
        const qry = `
            SELECT userID, firstName, lastName,
            userAge, Gender, userRole, emailAdd, userProfile, userImg, address, number
            FROM Users
            WHERE userID = ${req.params.id};
        `;
        db.query(qry, (err, result) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                result
            });
        });
    }

    // Create a new user
    async createUser(req, res) {
        let data = req.body;
        data.userPwd = await hash(data.userPwd, 9);

        let user = {
            emailAdd: data.emailAdd,
            userPwd: data.userPwd
        };

        const qry = `INSERT INTO Users SET ?;`;
             
        db.query(qry, [data], (err) => {
            if (err) {
                res.json({
                    status: res.statusCode,
                    msg: err
                });
            } else {
                let token = createToken(user);
                res.json({
                    status: res.statusCode,
                    token,
                    msg: 'You\'re registered'
                });
            }
        });
    }

    // Update user information (including profile)
    async updateUser(req, res) {
        const { id } = req.params;
        const userData = req.body;
        try {
            if(userData?.userPwd){
                userData.userPwd = await hash(userData?.userPwd, 9);
            }

            const qry = `
                UPDATE Users
                SET ?
                WHERE userID = ?
            `;
            
            db.query(qry, [userData, id], (err) => {
                if (err) throw err;
                res.json({
                    status: res.statusCode,
                    msg: "The user information is updated."
                });
            });
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({
                status: 500,
                msg: "An error occurred when updating the user information."
            });
        }
    }

    // Delete a user
    deleteUser(req, res) {
        const qry = `
            DELETE FROM Users
            WHERE userID = ${req.params.id};
        `;
        db.query(qry, (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "The user information has been removed."
            });
        });
    }

    // Delete user's own profile
    deleteUserProfile(req, res) {
        const userId = req.params.id;
        const qry = `
            DELETE FROM Users
            WHERE userID = ${userId};
        `;
        db.query(qry, (err) => {
            if (err) {
                console.error("Error deleting user profile:", err);
                res.status(500).json({
                    status: 500,
                    msg: "An error occurred when deleting the user profile."
                });
            } else {
                res.json({
                    status: res.statusCode,
                    msg: "Your profile has been deleted."
                });
            }
        });
    }
}

export { Users };
