import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserController = {
    // Fetch all users
    fetchUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Failed to fetch users' });
        }
    },

    // Fetch a user by ID
    fetchUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Failed to fetch user' });
        }
    },

    // Create a new user
    createUser: async (req, res) => {
        try {
            // Extract user data from request body
            const userData = req.body;
            
            // Validate user data (e.g., check if required fields are provided)

            // Hash user password before saving to the database
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;

            // Create a new user instance
            const newUser = new User(userData);

            // Save the new user to the database
            await newUser.save();

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Failed to create user' });
        }
    },

    // Update a user
    updateUser: async (req, res) => {
        try {
            // Extract user ID and updated data from request body
            const userId = req.params.id;
            const updatedUserData = req.body;

            // Update user in the database
            await User.findByIdAndUpdate(userId, updatedUserData);

            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Failed to update user' });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            // Extract user ID from request parameters
            const userId = req.params.id;

            // Delete user from the database
            await User.findByIdAndDelete(userId);

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Failed to delete user' });
        }
    },

    // User login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user with the provided email exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare passwords
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Failed to log in' });
        }
    },

    // Fetch items in the cart for a user
    fetchCartItems: async (req, res) => {
        try {
            // Retrieve user ID from decoded token
            const userId = req.user.userId;

            // Fetch user from the database
            const user = await User.findById(userId);

            // Check if user is verified
            if (!user.verified) {
                return res.status(403).json({ message: 'Unauthorized: User is not verified' });
            }

            // Fetch items in the cart for the user
            // Your implementation here...

            res.status(200).json({ message: 'Cart items fetched successfully' });
        } catch (error) {
            console.error('Error fetching cart items:', error);
            res.status(500).json({ message: 'Failed to fetch cart items' });
        }
    }
};

export default UserController;
