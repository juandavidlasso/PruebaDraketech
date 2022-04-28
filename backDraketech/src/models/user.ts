import { model, Schema, Document } from "mongoose";
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Model User
const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

export const User = model<IUser>('User', userSchema);