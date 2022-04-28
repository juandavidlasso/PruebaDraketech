import mongoose from "mongoose";
require('dotenv').config();

// Connection to DB MongoDB
mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database is connected');
})

connection.on('error', err => {
    console.log(err);
    process.exit(0);
})