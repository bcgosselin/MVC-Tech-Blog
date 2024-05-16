// Import

const sequelize = require('../config/connection');

//test Database connection

describe('Database connection', () => {
    it('should successfully connect to the database', async () => {
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
      }
    });
  });