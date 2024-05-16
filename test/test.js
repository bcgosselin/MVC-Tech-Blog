// Import
const request = require('supertest');
const app = require('../server');
const { User } = require('../models');
const bcrypt = require('bcrypt');

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

// Test cases for user authentication routes

describe('User Authentication Routes', () => {
  // Test case for user login
  describe('POST /api/users/login', () => {
    it('should log in existing user with correct credentials', async () => {
      const userData = { username: 'test1', password: 'password11' };
      const response = await request(app)
        .post('/api/users/login')
        .send(userData)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('message', 'You are now logged in!');
    });

    it('should return 400 if incorrect username or password is provided', async () => {
      const userData = { username: 'test1', password: 'incorrectpassword' };
      const response = await request(app)
        .post('/api/users/login')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Incorrect username or password, please try again');
    });
  });

  // Test case for user logout
  describe('POST /api/users/logout', () => {
    it('should log out a logged-in user', async () => {
      const agent = request.agent(app); // Create an agent to manage cookies for session
      await agent
        .post('/api/users/login')
        .send({ username: 'test1', password: 'password11' })
        .expect(200);

      const response = await agent.post('/api/users/logout').expect(204);
    });

    it('should return 404 if no user is logged in', async () => {
      const response = await request(app)
        .post('/api/users/logout')
        .expect(404);

      expect(response.body).toBeEmpty(); // Assuming response body is empty for 404 case
    });
  });
});

// Test case for withAuth middleware
describe('withAuth Middleware', () => {
  it('should redirect to login page if user is not logged in', async () => {
    const response = await request(app)
      .get('/')
      .expect(302);

    expect(response.headers.location).toEqual('/login');
  });
});