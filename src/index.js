// src/index.js

const express = require('express');
const app = express();

const postsRouter = require('./routes/posts.routes'); // ✔ correct path

app.use(express.json());
app.use('/api/v1/posts', postsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
