const { sequelize, DataTypes } = require('./index');
const User = require('./user'); // We link the Post to a User

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Establish relationship: each post belongs to one user
Post.belongsTo(User);

module.exports = Post;
