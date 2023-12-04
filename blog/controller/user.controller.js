const { userModel } = require("../models/user.schema");

const signupPage = (req, res) => {
  return res.render("signup");
};

const signUp = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await userModel.findOne({ email:email });
    if (user) {
      return res.status(400).cookie("role", user.role).cookie("id", user._id).send("testingUser");
    } else {
      let user = await userModel.create(req.body);
      return res.status(200).cookie("role", user.role).cookie("id", user._id).send(`Account created successfully ${user.username}`);
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const loginPage=(req,res)=>{
    return res.render("login");
};

const login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email:email});
    if(!user){
        return res.status(400).send("Invalid Credentials.");
    }
    if(user.password != password){
        return res.status(400).send("Invalid Credentials.");
    }
    else{
        return res.status(200).cookie("role",user.role).cookie("id",user.id).cookie("author",user.username).send(`Welcome User ${user.username}`);
    }
};

module.exports = { signupPage, signUp,loginPage,login};
