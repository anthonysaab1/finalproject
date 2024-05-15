let catAction = document.getElementById("btnAction");
let catComedy = document.getElementById("btnComedy");
let catDrama = document.getElementById("btnDrama");
let catThriller = document.getElementById("btnThriller");
let catAll = document.getElementById("btnAll");
let moviee = document.getElementById("codes-container");
let okBtn = document.getElementById("okBtn");
let happyCt = document.getElementById("happyBtn");
let sadCt = document.getElementById("sadBtn");
let angryCt = document.getElementById("angryBtn");
let loader = document.getElementById("loader")
console.log(loader)
let datas;
async function filterCategories(category , num){
  category = datas.filter((ca) => ca.category_id == num) ;
  moviee.innerHTML = "";
  creatMovie(category)
  loader.style.display = "none";
}
catAction.onclick = async function () {
  let action;

filterCategories(action, 3);
};
catComedy.onclick = async function () {
  let comedy;

  filterCategories(comedy, 2);
};
catDrama.addEventListener("click",  () => {
  let drama;

 filterCategories(drama, 1)
});
catThriller.onclick = async function () {
  let thriller ;

filterCategories(thriller , 4)
};
catAll.onclick = async function () {
  moviee.innerHTML = "";
  creatMovie(datas);
};
fetch('get_movies.php')
  .then(response => response.json())
  .then(data => {
    creatMovie(data);
    datas = data;
   console.log(data)
  })
  .catch(error => console.error('Error fetching data:', error));
  console.log(datas)
async function creatMovie(data){
  loader.style.display = "block";
  let cont = document.getElementById("codes-container");
  data.forEach(Movie => { 
    console.log(Movie.category_id);
    
  let moviebox = document.createElement("div");
  moviebox.setAttribute("class", "box");

  let movieItem = document.createElement("div");
  movieItem.setAttribute("id", "text1");

  let movieTitle = document.createElement("span");
  movieTitle.setAttribute("id", "movie-title");
  movieTitle.innerHTML = `${Movie.title}`;

  let moviecbtn = document.createElement("button");
  moviecbtn.setAttribute("id", "favBtn")
  // moviecbtn.onclick = () => toggle(Movie.id, `${Movie.title}`);
  // let movieBtnadd = document.createElement("button");
  // movieBtnadd.setAttribute("id", "favBtn")
  let moviefav = document.createElement("img")
  moviefav.setAttribute("class", "favorite-image");
  moviefav.src = Movie.fav;
  let movieImg = document.createElement("img");
  movieImg.setAttribute("id", "mytn");
  movieImg.src = Movie.image;
  let moviebtn = document.createElement("div");
  moviebtn.setAttribute("id", "myBtn");
  moviebtn.addEventListener("click", async function () {
    let modal = document.querySelector("#myModal");
    const btn = document.querySelectorAll("#myBtn");
    const span = document.getElementById("close");
    let video = document.createElement("video");
    modal.style.display = "block";
    span.onclick = async function () {
      modal.style.display = "none";
      document.getElementById("modal-a").removeChild(video);
    };

    video.width = 800;
    video.height = 600;
    video.controls = true;
    let source = document.createElement("source");
    source.src = Movie.video;
    source.type = "video/mp4";

    video.appendChild(source);
    document.getElementById("modal-a").appendChild(video);
  });
  moviecbtn.appendChild(moviefav)
  movieItem.append(movieTitle, moviecbtn);
  moviebox.append(moviebtn, movieItem);
  // moviecbtn.appendChild(movieBtnadd);
  
  cont.append(moviebox);
  moviebtn.appendChild(movieImg); });
  loader.style.display = "none";
}
let navLinks = document.querySelectorAll('#nav button');


async function updateActive(event) {

  navLinks.forEach(async function(link) {
    link.classList.remove('active');
  });


  event.target.classList.add('active');
}

navLinks.forEach(async function(link) {
  link.addEventListener('click', updateActive);
});


let currentHash = window.location.hash;
console.log(currentHash);
if (currentHash) {
  let currentLink = document.querySelector('a[href="' + currentHash + '"]');
  if (currentLink) {
    currentLink.classList.add('active');
  }else {
    navLinks[0].classList.add('active');
  }
}
////////////////
let modal2 = document.getElementById("myModal2");2
let btn = document.getElementById("myBtn2");
let span = document.getElementsByClassName("close2")[0];
btn.onclick = async function () {
  modal2.style.display = "block";
};
span.onclick = async function () {
  modal2.style.display = "none";
};
window.onclick = async function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};
okBtn.addEventListener("click", ()=>{
  if(happyCt.checked) {
    let happy;
    
    filterCategories(happy , 3)
  }else if(sadCt.checked){
    let sad
    filterCategories(sad , 2);
  }else if(angryCt.checked){
    let angry;
    filterCategories(angry , 4)
  }
  modal2.style.display = "none";
});

fetch('category.php')
  .then(response => response.json())
  .then(data => {
    loader.style.display = "block";
   data.forEach((category)=>{
    console.log(category.title);
   })
   loader.style.display = "none";
  })
  .catch(error => console.error('Error fetching data:', error));
