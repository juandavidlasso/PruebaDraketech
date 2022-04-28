import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { User, IUser } from '../models/user'
require('dotenv').config();


// Function create token
const createToken = (user: IUser) => {
    return jwt.sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }, `${process.env.SECRET}`);
}


// Function register user
export const signUp = async (req: Request, res: Response) => {
    
    const { firstName, lastName, email, password } = req.body;
    let patron = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

    if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Please, send all the data' })
    }

    if(patron.test(email) === false) {
        return res.status(400).json({ message: 'Email does not hace the correct structure' });
    }

    const user = await User.findOne({email: email});
    if(user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User(req.body);
    await newUser.save();

    return res.status(200).json(newUser);
}


// Function login user
export const signIn = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Please, send your email and password.' });
    };
    
    const user = await User.findOne({ email: email });
    if(!user) {
        return res.status(400).json({ message: 'The user does not exists.' })
    };

    if(!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'The password is incorrect'})
    };

    let token = createToken(user);

    return res.status(200).json({
        token,
        user
    });
}