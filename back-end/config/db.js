const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('margintool', 'postgres', '123', {
    host: 'localhost',
    port: 5432, // Port number
    dialect: 'postgres',
    logging: true // Disable logging SQL queries (optional)
  });
  

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
