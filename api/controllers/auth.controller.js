import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    const hashedpassword=bcrypt.hashSync(password,10);
    const newUser = new User({ username, email, password:hashedpassword });
    try {
        const user=await newUser.save();
        res.status(201).json('User created');
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res,next) => {
    const { email, password } = req.body;
    try{
        const validUser=await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'Email does not exist'));
        }
        const validPassword=bcrypt.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,'Wrong Credentials'));
        }
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        const {password:pass,...user}=validUser._doc;
        res.cookie('access_token',token,{httpOnly:true,expiresIn:'7d'}).status(200).json(user);
    }catch(error){
        next(error);
    }
}