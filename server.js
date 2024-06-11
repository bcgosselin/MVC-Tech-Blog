// Import
const express = require('express'); 
const session = require('express-session'); 
const path = require('path'); 
const exphbs = require('express-handlebars'); 
const routes = require('./controllers'); 
const { formatDate } = require('./utils/helpers'); 
const sequelize = require('./config/connection'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express(); 
const PORT = process.env.PORT || 3001; 

// Create the Handlebars engine with custom helpers
const hbs = exphbs.create({
  helpers: {
    formatDate: formatDate // Helper function to format dates
  }
});

// Session configuration
const sess = {
  secret: 'Super secret secret', 
  cookie: {}, 
  resave: false, // Whether to save the session on each request
  saveUninitialized: true, 
  store: new SequelizeStore({ 
    db: sequelize // Sequelize instance for database connection
  })
};

// Middleware setup
app.use(session(sess)); 
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars'); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 

// Add routes from controllers
app.use(routes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`)); 
});
