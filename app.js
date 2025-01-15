const express = require('express');
const app = express();
const { sequelize } = require('./models');

// Middleware to parse JSON data from requests
app.use(express.json());

// A basic route
app.get('/', (req, res) => {
    res.send('Welcome to your API!');
});

// Server listens on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

const User = require('./models/user');
const Post = require('./models/post');

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
  try {
    const user = await User.create(req.body);
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

// GET all posts
app.get('/posts', async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
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

// POST a new post
app.post('/posts', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).send(error.message);
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

app.get('/api-docs', (req, res) => {
  res.send(`
    <h1>API Documentation</h1>
    <p><strong>GET /users</strong> - Get all users</p>
    <p><strong>GET /users/:id</strong> - Get a specific user by ID</p>
    <p><strong>POST /users</strong> - Create a new user</p>
    <p><strong>PUT /users/:id</strong> - Update a user</p>
    <p><strong>DELETE /users/:id</strong> - Delete a user</p>
    <p><strong>GET /posts</strong> - Get all posts</p>
    <p><strong>GET /posts/:id</strong> - Get a specific post by ID</p>
    <p><strong>POST /posts</strong> - Create a new post</p>
    <p><strong>PUT /posts/:id</strong> - Update a post</p>
    <p><strong>DELETE /posts/:id</strong> - Delete a post</p>
  `);
});
