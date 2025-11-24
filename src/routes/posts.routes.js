const express = require("express");
const router = express.Router();

// your original GET route for posts
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "All posts fetched successfully",
  });
});

module.exports = router;
