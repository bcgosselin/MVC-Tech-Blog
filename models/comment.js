// Import
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// Initialize
Comment.init(
  {
    // Define the id column as an integer, auto-incrementing primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define the comment_text column as text
    comment_text: {
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
    },
    // Define the post_id column as an integer, referencing the id column in the post table
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  // Define additional model options such as the Sequelize instance, table name, etc.
  {
    sequelize, // Sequelize instance
    timestamps: true, // Include timestamps for createdAt and updatedAt
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use snake_case for column names
    modelName: 'comment'
  }
);

// Export
module.exports = Comment;