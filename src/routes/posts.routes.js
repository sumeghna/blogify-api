// routes/posts.routes.js
const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  getPostById
} = require('../controllers/posts.controller');

// GET /api/v1/posts  → must use standardized JSON envelope
router.get('/', getAllPosts);

// GET /api/v1/posts/:postId → must use standardized JSON envelope
router.get('/:postId', getPostById);

module.exports = router;
