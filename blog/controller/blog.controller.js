const { blogModel } = require("../models/blog.schema");
const { userModel } = require("../models/user.schema");

const blogPage = async (req, res) => {
  return res.render("addBlog");
};


const displayBlog=(req,res)=>{
  res.render("index.ejs");
};

const createBlog = async (req, res) => {
  try {
    let { id } = req.cookies;
    let { title, content, category, image } = req.body;
    let user = await userModel.findById(id);
    let newBlog = await blogModel.create({
      title,
      content,
      category,
      image,
      author: req.cookies.author,
    });
    return res.status(200).cookie("blogId", newBlog._id).send(`blog created by ${user.username}`);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const allBlogs = async (req, res) => {
  try {
    let blogs = await blogModel.find();
    return res.status(200).send(blogs);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};


module.exports = { blogPage, createBlog, allBlogs,displayBlog };
