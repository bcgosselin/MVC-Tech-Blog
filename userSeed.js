// Import necessary modules
const sequelize = require('./config/connection');
const bcrypt = require('bcrypt');
const { User } = require('./models/User');

// Define user data
const userData = [
  {
    username: 'test1',
    password: bcrypt.hashSync('password11', 10)
  },
  {
    username: 'test2',
    password: bcrypt.hashSync('password22', 10)
  },
  {
    username: 'test3',
    password: bcrypt.hashSync('password33', 10)
  },
  {
    username: 'test4',
    password: bcrypt.hashSync('password44', 10)
  }
];

// function to seed the database
const seedDatabase = async () => {
  try {
    // Sync the Sequelize model with the database
    await sequelize.sync({ force: true });

    // Insert userData into the User table
    await User.bulkCreate(userData);

    console.log('Database seeded successfully.');

    // Exit the process
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Call the seedDatabase function
seedDatabase();
