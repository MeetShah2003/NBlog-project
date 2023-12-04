const displayBlogs=(data)=>{
    document.getElementById("parent-box").innerHTML="";
    data.map((ele)=>{        
        let image=document.createElement("img");
        image.src=ele.image;
        let title=document.createElement("h2");
        title.innerHTML=ele.title;
        let category=document.createElement("h3");
        category.innerHTML=ele.category;
        category.style.padding="7px 0px";
        let content=document.createElement("p");
        content.innerHTML=ele.content;
        let btn1=document.createElement("button");
        btn1.innerHTML=`Like <i class="fa-solid fa-thumbs-up fa-bounce"></i>`;
        btn1.setAttribute("id","btn-like");
        btn1.style.marginRight="15px";
        let div=document.createElement("div");
        div.append(image,title,category,content,btn1);
        div.style.padding="15px 0px";
        div.style.margin="10px 0px";
        document.getElementById("parent-box").append(div);
        document.getElementById("parent-box").style.textAlign="center";
    });
}

const getBlogs = async () => {
  fetch("http://127.0.0.1:8090/blog/blogs")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayBlogs(data);
    });
};

getBlogs();
