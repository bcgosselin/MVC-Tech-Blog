// Import
const Sequelize = require('sequelize');
require('dotenv').config();

// Initialize
let sequelize;

// Check if the JawsDB URL is available for deployment on Heroku
if (process.env.JAWSDB_URL) {
  // Create a new Sequelize instance using the JawsDB URL
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
  });
} else {
  // If the JawsDB URL is not available, use local database configuration
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: process.env.DB_DIALECT || 'mysql',
      port: process.env.DB_PORT || 3306,
    }
  );
}

// Export
module.exports = sequelize;