require('dotenv').config();
const chalk = require('chalk');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const { database } = keys;

const setupDB = async () => {
  const dbUrl = database.url || 'mongodb://127.0.0.1:27017/mern_ecommerce';

  try {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
  } catch (error) {
    console.error(`${chalk.red('✗')} MongoDB connection failed:`, error.message);
    console.error(`${chalk.red('✗')} Server startup aborted due to DB error.`);
    process.exit(1);
  }
};

module.exports = setupDB;
