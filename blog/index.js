const express=require("express");
// const cors=require("cors");
const cookie=require("cookie-parser");
const { userRoute } = require("./routes/user.routes");
const { connection } = require("./config/db");
const { blogRoute } = require("./routes/blog.routes");
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cors);
app.use(cookie());

app.set("view engine","ejs");
app.set("views",__dirname+"/views");
app.use(express.static(__dirname+"/public"));

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(8090,()=>{
    console.log("Server is running on port 8090");
    connection();
});