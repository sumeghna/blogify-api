// controllers/posts.controller.js

// GET /api/v1/posts
async function getAllPosts(req, res) {
  // Sample data (must be REAL JSON)
  const posts = [
    { id: 1, title: "First post" },
    { id: 2, title: "Second post" }
  ];

  return res.status(200).json({
    success: true,
    data: {
      posts: posts
    }
  });
}

// GET /api/v1/posts/:postId
async function getPostById(req, res) {
  const postId = req.params.postId;

  const post = {
    id: postId,
    title: `Post with ID ${postId}`
  };

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
