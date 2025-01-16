const express = require('express');
const app = express();
const { sequelize } = require('./models');
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Post = require('./models/post');

// Middleware to parse JSON data from requests
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server listens on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

sequelize.sync().then(() => {
  console.log('Database synced!');
});

// GET all users
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// GET a single user
app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// POST a new user
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  // Log the received body to check if it's coming as expected
  console.log('Received body:', req.body);

  // Validate that the name is a string and contains only letters (no numbers, no special characters)
  const nameIsValid = /^[A-Za-z]+$/.test(name); // Only alphabetic characters allowed

  if (!nameIsValid) {
    return res.status(400).send('Name must only contain letters and cannot contain numbers or special characters.');
  }

  try {
    // Create the user only if the validation passed
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// PUT (update) an existing user
app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE a user
app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

app.get('/posts', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // default to 10 posts per page
  const offset = parseInt(req.query.offset) || 0; // default to the first page

  try {
    const posts = await Post.findAll({ limit, offset });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Middleware for basic validation
const validatePost = (req, res, next) => {
  const { title, content, UserId } = req.body;
  if (!title || !content || !UserId) {
    return res.status(400).send('Title, content, and author are required');
  }
  if (typeof title !== 'string' || typeof content !== 'string' || typeof UserId !== 'string') {
    return res.status(400).send('Title, content, and author must be strings');
  }
  next();
};

app.post('/posts', validatePost, async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/posts/search', async (req, res) => {
  const { query, sortBy = 'createdAt', order = 'ASC' } = req.query;

  if (!query) {
    return res.status(400).send('Search query is required');
  }

  try {
    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
          { UserId: { [Op.like]: `%${query}%` } }
        ]
      },
      order: [[sortBy, order.toUpperCase()]]
    });

    if (posts.length === 0) {
      return res.status(404).send('No posts found matching the query');
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// GET a single post
app.get('/posts/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

// PUT (update) an existing post
app.put('/posts/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (post) {
    await post.update(req.body);
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

// DELETE a post
app.delete('/posts/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (post) {
    await post.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Post not found');
  }
});