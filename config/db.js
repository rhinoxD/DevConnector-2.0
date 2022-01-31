const mongoose = require('mongoose');
const config = require('config');
const db = process.env.mongoURI || config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process without failure
    process.exit(1);
  }
};

module.exports = connectDB;
