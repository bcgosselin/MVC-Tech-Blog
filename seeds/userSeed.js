const sequelize = require('../config/connection');

const { User } = require('../models');

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

const seedDatabase = async () => {

  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true, 
    returning: true, 
  });

  process.exit(0);
};

seedDatabase();