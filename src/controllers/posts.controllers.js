// src/controllers/posts.controller.js

// Controller function to handle GET all posts
const getAllPosts = (req, res) => {
  return res.json({
    success: true,
    message: "All posts fetched successfully",
  });
};

module.exports = {
  getAllPosts,
};
