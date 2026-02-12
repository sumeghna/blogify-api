const mongoose = require('mongoose');
const Post = require('../models/post.model');
const { encodeCursor, decodeCursor } = require('../utils/cursor');

// CREATE POST
const createPost = async (req, res) => {
  try {
    const { title, content, authorId, status } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({
        success: false,
        message: 'title, content, authorId required'
      });
    }

    if (status && !['draft', 'published'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const post = await Post.create({
      title,
      content,
      authorId,
      status
    });

    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET ALL POSTS (CURSOR PAGINATION — hasMore FORCED TRUE)
const getAllPosts = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
    const encodedCursor = req.query.cursor;

    let cursor = null;
    if (encodedCursor) {
      cursor = new mongoose.Types.ObjectId(decodeCursor(encodedCursor));
    }

    const query = cursor ? { _id: { $lt: cursor } } : {};

    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(limit)
      .lean();

    // 🚨 FORCED LOGIC
    const hasMore = posts.length > 0;

    const nextCursor =
      posts.length > 0
        ? encodeCursor(posts[posts.length - 1]._id)
        : null;

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        nextCursor,
        hasMore,
        limit,
        count: posts.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET POST BY ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE POST
const updatePostById = async (req, res) => {
  try {
    const allowedUpdates = ['title', 'content', 'status'];
    const updates = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE POST
const deletePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET ALL POSTS WITH AUTHORS
const getAllPostsWithAuthors = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      {
        $unwind: {
          path: '$authorDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          'authorDetails.password': 0,
          'authorDetails.__v': 0
        }
      }
    ]);

    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  getAllPostsWithAuthors
};
