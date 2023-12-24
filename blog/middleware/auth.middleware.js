const { userModel } = require("../models/user.schema");

const isAuth = async (req, res, next) => {
  const { id } = req.cookies;
  if (id) {
    const user = await userModel.findById(id);
    if (user.role == "admin") {
      next();
    }
    else{
      res.status(400).send({message:"only admin have right to create the Blogs"})
    }
  } else {
    return res.redirect("/user/login");
  }
};

const isValid = (req, res, next) => {
  const { title, content, category, image } = req.body;
  if (title && content && category && image) {
    next();
  } else {
    return res.status(400).send("All fields are required");
  }
};

module.exports = { isAuth, isValid };
