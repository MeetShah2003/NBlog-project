const {Router}=require("express");
const { blogPage, createBlog, allBlogs, displayBlog } = require("../controller/blog.controller");
const { isAuth, isValid } = require("../middleware/auth.middleware");
const blogRoute=Router();

blogRoute.get("/create",isAuth,blogPage);

blogRoute.post("/create",isValid,isAuth,createBlog);

blogRoute.get("/blogs",allBlogs);

blogRoute.get("/",displayBlog);

module.exports={blogRoute};