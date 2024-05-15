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
let datas;
function filterCategories(category , num){
  category = datas.filter((ca) => ca.category_id == num) ;
  moviee.innerHTML = "";
  creatMovie(category)
}
catAction.onclick = function () {
  let action;

filterCategories(action, 3);
};
catComedy.onclick = function () {
  let comedy;

  filterCategories(comedy, 2);
};
catDrama.addEventListener("click",  () => {
  let drama;

 filterCategories(drama, 1)
});
catThriller.onclick = function () {
  let thriller ;

filterCategories(thriller , 4)
};
catAll.onclick = function () {
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
function creatMovie(data){
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
  moviecbtn.onclick = () => toggle(Movie.id, `${Movie.title}`);

  let movieImg = document.createElement("img");
  movieImg.setAttribute("id", "mytn");
  movieImg.src = Movie.image;
  let moviebtn = document.createElement("div");
  moviebtn.setAttribute("id", "myBtn");
  moviebtn.addEventListener("click", function () {
    let modal = document.querySelector("#myModal");
    const btn = document.querySelectorAll("#myBtn");
    const span = document.getElementById("close");
    let video = document.createElement("video");
    modal.style.display = "block";
    span.onclick = function () {
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

  moviebox.append(movieItem, moviebtn);
  movieItem.append(movieTitle, moviecbtn);
  cont.append(moviebox);
  moviebtn.appendChild(movieImg); });
}
let navLinks = document.querySelectorAll('#nav button');


function updateActive(event) {

  navLinks.forEach(function(link) {
    link.classList.remove('active');
  });


  event.target.classList.add('active');
}

navLinks.forEach(function(link) {
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
btn.onclick = function () {
  modal2.style.display = "block";
};
span.onclick = function () {
  modal2.style.display = "none";
};
window.onclick = function (event) {
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
   data.forEach((category)=>{
    console.log(category.title);
   })
  })
  .catch(error => console.error('Error fetching data:', error));
