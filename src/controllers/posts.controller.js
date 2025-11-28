// src/controllers/posts.controller.js

const getAllPosts = (req, res) => {
  return res.json({
    success: true,
    message: "All posts fetched successfully",
  });
};

module.exports = { getAllPosts };
