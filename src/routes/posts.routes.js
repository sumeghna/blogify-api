// routes/posts.routes.js
const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts.controller');

// collection route
router.get('/', (req, res) => {
  res.send('List of posts');
});

// dynamic single-post route
router.get('/:postId', postController.getPostById); // keep this after '/'[web:40][web:41][web:54]

module.exports = router;