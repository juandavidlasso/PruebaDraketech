"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
// Connection to DB MongoDB
mongoose_1.default.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`);
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('Database is connected');
});
connection.on('error', err => {
    console.log(err);
    process.exit(0);
});
