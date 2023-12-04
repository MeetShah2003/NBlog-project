const {Router}=require("express");
const { signupPage, signUp, loginPage, login } = require("../controller/user.controller");
const userRoute=Router();

userRoute.get("/signup",signupPage);

userRoute.post("/signup",signUp);

userRoute.get("/login",loginPage);

userRoute.post("/login",login);

module.exports={userRoute};