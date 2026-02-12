require('dotenv').config(); // MUST be first

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/upload.routes');
const errorHandler = require('./middlewares/errorHandler');

connectDB();

const app = express();

// ✅ CORS configuration (important for cookies)
app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // ✅ required for reading cookies

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
