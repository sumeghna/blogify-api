const express = require('express');
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  getAllPostsWithAuthors
} = require('../controllers/posts.controller');

// STATIC ROUTE MUST COME FIRST
router.get('/with-authors', getAllPostsWithAuthors);

// CRUD ROUTES
router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.patch('/:id', updatePostById);
router.delete('/:id', deletePostById);

module.exports = router;
