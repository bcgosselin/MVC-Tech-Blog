// Import the User, Post, and Comment models
const User = require('./user');
const Post = require('./Post');
const Comment = require('./comment');


User.hasMany(Post, {
  foreignKey: 'userId', // Define foreign key in the Post model referencing the User model
});

Post.belongsTo(User, {
  foreignKey: 'userId', // Define foreign key in the Post model referencing the User model
});

Comment.belongsTo(User, {
  foreignKey: 'userId', // Define foreign key in the Comment model referencing the User model
});

Comment.belongsTo(Post, {
  foreignKey: 'postId', // Define foreign key in the Comment model referencing the Post model
});

User.hasMany(Comment, {
  foreignKey: 'userId', // Define foreign key in the Comment model referencing the User model
});

Post.hasMany(Comment, {
  foreignKey: 'postId', // Define foreign key in the Comment model referencing the Post model
});

// Export
module.exports = { User, Post, Comment };