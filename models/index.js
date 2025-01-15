const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Test the connection
async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connect();

// Export the Sequelize instance
module.exports = { sequelize, DataTypes };
