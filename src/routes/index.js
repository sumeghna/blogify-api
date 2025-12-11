const express =require("express");
const router=express.Router();

const PostRouter=require("./posts.routes");

router.use("/posts",PostRouter);

module.exports=router;