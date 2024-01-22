import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedpassword=bcrypt.hashSync(password,10);
    const newUser = new User({ username, email, password:hashedpassword });
    try {
        const user=await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}