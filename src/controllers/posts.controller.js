// controllers/posts.controller.js

// GET /api/v1/posts/:postId
async function getPostById(req, res) {
  const postId = req.params.postId; // read URL parameter[web:51][web:53][web:54]
  res.json({
    message: 'Fetching data for post with ID: ' + postId,
  });
}

module.exports = {
  getPostById
};
