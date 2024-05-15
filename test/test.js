const { User } = require('../models/user');

const sequelize = require('../config/connection');

//test Database connection

describe('Database connection', () => {
    // Define a test case for establishing a connection
    it('should successfully connect to the database', async () => {
      try {
        // Attempt to authenticate with the database
        await sequelize.authenticate();
        // If authentication is successful, log a success message
        console.log('Connection has been established successfully.');
      } catch (error) {
        // If authentication fails, log the error
        console.error('Unable to connect to the database:', error);
        // Throw the error to fail the test
        throw error;
      }
    });
  });