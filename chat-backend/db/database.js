const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const database = process.env.DATABASE_URL;

const db = new Sequelize(database, {
  logging: false,
});

const main = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.log('Unable to connect to the database', error);
  }
};

main();

module.exports = db;
