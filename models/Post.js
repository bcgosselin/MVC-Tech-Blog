// Import
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    // Define the id column as an integer, auto-incrementing primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define the title column as a string, which cannot be null
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Define the content column as text, which cannot be null
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // Define the user_id column as an integer, referencing the id column in the user table
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  
  {
    sequelize,
    timestamps: true, // Include timestamps for createdAt and updatedAt
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use snake_case for column names
    modelName: 'post'
  }
);

// Export
module.exports = Post;