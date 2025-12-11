// src/index.js

const express = require('express');
const app = express();
app.use(express.json());



const mainRouter=require('./routes/index.js');
app.use("/api/v1",mainRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
