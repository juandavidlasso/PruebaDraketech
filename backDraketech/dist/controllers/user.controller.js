"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
require('dotenv').config();
// Function create token
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }, `${process.env.SECRET}`);
};
// Function register user
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    let patron = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Please, send all the data' });
    }
    if (patron.test(email) === false) {
        return res.status(400).json({ message: 'Email does not hace the correct structure' });
    }
    const user = yield user_1.User.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new user_1.User(req.body);
    yield newUser.save();
    return res.status(200).json(newUser);
});
exports.signUp = signUp;
// Function login user
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please, send your email and password.' });
    }
    ;
    const user = yield user_1.User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: 'The user does not exists.' });
    }
    ;
    if (!bcrypt_1.default.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'The password is incorrect' });
    }
    ;
    let token = createToken(user);
    return res.status(200).json({
        token,
        user
    });
});
exports.signIn = signIn;
