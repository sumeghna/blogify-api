const express = require("express");
const app = express();

const postsRouter = require("./routes/posts.routes");

app.use(express.json());

// Mount the router
app.use("/api/v1/posts", postsRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
