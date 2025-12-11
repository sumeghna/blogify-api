
// controllers/posts.controller.js

// Temporary sample database
const posts = [
  { id: 1, title: "First post" },
  { id: 2, title: "Second post" },
  { id: 3, title: "Third post" }
];

// GET /api/v1/posts
async function getAllPosts(req, res) {
  return res.status(200).json({
    success: true,
    data: {
      posts: posts
    }
  });
}

// GET /api/v1/posts/:postId
async function getPostById(req, res) {
  const postId = Number(req.params.postId);   // convert string → number

  // Find the post
  const post = posts.find(p => p.id === postId);

  // If not found, return 404
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  // Otherwise return the post
  return res.status(200).json({
    success: true,
    data: {
      post: post
    }
  });
}

module.exports = {
  getAllPosts,
  getPostById
};
