const express = require('express');
const router = express.Router();
const { getTopAuthors, getDashboardAnalytics } = require('../controllers/analytics.controller');

router.get('/top-authors', getTopAuthors);       // optional
router.get('/dashboard', getDashboardAnalytics); // dashboard endpoint

module.exports = router;
