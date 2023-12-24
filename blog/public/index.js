let blogArr = [];
const displayBlogs = (data) => {
  document.getElementById("parent-box").innerHTML = "";
  data.map((ele) => {
    let image = document.createElement("img");
    image.src = ele.image;
    let title = document.createElement("h2");
    title.innerHTML = ele.title;
    let category = document.createElement("h3");
    category.innerHTML = ele.category;
    category.style.padding = "7px 0px";
    let content = document.createElement("p");
    content.innerHTML = ele.content;
    let btn1 = document.createElement("button");
    btn1.innerHTML = `Like <i class="fa-solid fa-thumbs-up fa-bounce"></i>`;
    btn1.setAttribute("id", "btn-like");
    btn1.style.marginRight = "15px";
    let btn2 = document.createElement("button");
    btn2.innerHTML = `Delete <i class="fa-regular fa-trash-can fa-bounce"></i>`;
    btn2.setAttribute("id", "btn-delete");
    btn2.style.marginRight = "15px";
    btn2.addEventListener("click", () => {
      deleteBlog(ele._id);
    });
    let div = document.createElement("div");
    div.append(image, title, category, content, btn1, btn2);
    div.style.padding = "15px 0px";
    div.style.margin = "10px 0px";
    document.getElementById("parent-box").append(div);
    document.getElementById("parent-box").style.textAlign = "center";
  });
};

const deleteBlog = (id) => {
  fetch(`http://127.0.0.1:8090/blog/dlt/${id}`, {
    method: "DELETE"
  })
    .then(() => getBlogs())
    .catch((err) => console.log(err.message));
};

const filterCategory = (category) => {
  fetch(`http://127.0.0.1:8090/blog/filter?category=${category}`)
    .then((res) => res.json())
    .then((blog) => displayBlogs(blog))
    .catch((err) => console.log(err.message));
};

document.getElementById("sport").addEventListener("click", () => filterCategory("sport"));
document.getElementById("technology").addEventListener("click", () => filterCategory("technology"));
document.getElementById("electronic").addEventListener("click", () => filterCategory("electronic"));
document.getElementById("health").addEventListener("click", () => filterCategory("health"));
document.getElementById("entertainment").addEventListener("click", () => filterCategory("entertainment"));

document.getElementById("search").addEventListener("input", (e) => {
  e.preventDefault();
  let searchData = document.getElementById("search").value;

  fetch(`http://127.0.0.1/blog/search?blogs=${searchData}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          blogArr.push(data[i].item);
          displayBlogs(blogArr);
        }
      }
      else {
        getBlogs();
      }
    })
    .catch((err) => console.log(err.message));
});


const getBlogs = async () => {
  fetch("http://127.0.0.1:8090/blog/blogs")
    .then((res) => res.json())
    .then((data) => {
      displayBlogs(data);
    });
};

getBlogs();
