const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB);
    console.log(`MongoDB connection ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.log(`${error.name} ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
