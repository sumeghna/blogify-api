const Post = require('../models/post.model');

// Top authors (optional separate endpoint)
exports.getTopAuthors = async (req, res) => {
  try {
    const topAuthors = await Post.aggregate([
      { $match: { authorId: { $ne: null } } },
      { $group: { _id: '$authorId', postCount: { $sum: 1 } } },
      { $sort: { postCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      { $unwind: '$authorDetails' },
      {
        $project: {
          _id: 0,
          authorId: '$_id',
          postCount: 1,
          authorName: '$authorDetails.name',
          authorEmail: '$authorDetails.email'
        }
      }
    ]);

    res.status(200).json({ success: true, data: topAuthors });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Dashboard analytics
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const analytics = await Post.aggregate([
      {
        $facet: {
          totalStats: [
            {
              $group: {
                _id: null,
                totalPosts: { $sum: 1 },
                avgContentLength: { $avg: { $strLenCP: '$content' } }
              }
            }
          ],
          postsByStatus: [{ $sortByCount: '$status' }],
          topAuthors: [
            { $match: { authorId: { $ne: null } } },
            { $group: { _id: '$authorId', postCount: { $sum: 1 } } },
            { $sort: { postCount: -1 } },
            { $limit: 5 },
            {
              $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'author'
              }
            },
            { $unwind: '$author' },
            {
              $project: {
                _id: 0,
                authorId: '$_id',
                postCount: 1,
                authorName: '$author.name',
                authorEmail: '$author.email'
              }
            }
          ],
          recentPosts: [
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            {
              $lookup: {
                from: 'users',
                localField: 'authorId',
                foreignField: '_id',
                as: 'author'
              }
            },
            { $unwind: '$author' },
            {
              $project: {
                _id: 1,
                title: 1,
                status: 1,
                createdAt: 1,
                authorName: '$author.name'
              }
            }
          ]
        }
      }
    ]);

    res.status(200).json({ success: true, data: analytics[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
