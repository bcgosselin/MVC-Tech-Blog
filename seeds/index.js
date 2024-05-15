const sequelize = require('../config/connection');
const seedUser = require('./userSeed');

// Added a bunch of logs for monitoring the seeding process
const seedAll = async () => {
  console.log('Starting database seeding...');

  try {
    await sequelize.sync({ force: true });

    console.log('Database sync successful.');

    console.log('Seeding users...');
    await seedUser();
    console.log('User seeding completed.');

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }

  process.exit(0);
};

seedAll();