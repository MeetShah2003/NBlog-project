const fuse = require("fuse.js");
const { blogModel } = require("../models/blog.schema");
const { userModel } = require("../models/user.schema");

const blogPage = async (req, res) => {
  return res.render("addBlog");
};


const displayBlog = (req, res) => {
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

const filterBlog = async (req, res) => {
  try {
    const { category } = req.query;
    const filteredBlog = await blogModel.find({ category: category });
    return res.status(200).send(filteredBlog);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await blogModel.findByIdAndDelete(id);
    if (deletedBlog) {
      const blog = await blogModel.find();
      return res.status(200).send(blog);
    }
    else {
      return res.status(400).send("blog not found");
    }
  } catch (error) {
    return res.status(200).send(error.message);
  }
};

const searchBlog = async (req, res) => {
  // try {
  //   let query = req.query.blogs;
  //   const blogs = await blogModel.find();

  //   const options = {
  //     keys: ["author", "category", "title"],
  //   };
  //   const fuse = new fuse(blogs, options);
  //   const result = fuse.search(query);
  //   return res.status(200).send(result);
  // } catch (error) {
  //   return res.status(400).send(error.message);
  // }

  try {
    let query = req.query.blogs;
    const blogs = await blogModel.find();
    const option = { keys: ["author", "category", "title",] }

    const fuseFilter = new fuse(blogs, option)
    const result = fuseFilter.search(query);
    return res.send(result)
  } catch (error) {
    return res.send(error.message)
  }
}


module.exports = { blogPage, createBlog, allBlogs, displayBlog, filterBlog, deleteBlog, searchBlog };
