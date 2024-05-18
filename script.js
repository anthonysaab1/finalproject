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
let loader = document.getElementById("loader");

let datas;
let userIdArr = localStorage.userId ? JSON.parse(localStorage.userId) : [];
async function filterCategories(category, num) {
  category = datas.filter((ca) => ca.category_id == num);
  moviee.innerHTML = "";
  creatMovie(category);
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
catDrama.addEventListener("click", () => {
  let drama;

  filterCategories(drama, 1);
});
catThriller.onclick = async function () {
  let thriller;

  filterCategories(thriller, 4);
};
catAll.onclick = async function () {
  moviee.innerHTML = "";
  creatMovie(datas);
};
fetch("get_movies.php?id=1")
  .then((response) => response.json())
  .then((data) => {
    creatMovie(data);
    datas = data;
  })
  .catch((error) => console.error("Error fetching data:", error));

async function creatMovie(data) {
  loader.style.display = "block";
  let cont = document.getElementById("codes-container");
  data.forEach((Movie) => {
    let moviebox = document.createElement("div");
    moviebox.setAttribute("class", "box");

    let movieItem = document.createElement("div");
    movieItem.setAttribute("id", "text1");

    let movieTitle = document.createElement("span");
    movieTitle.setAttribute("id", "movie-title");
    movieTitle.innerHTML = `${Movie.title} `;

    let moviecbtn = document.createElement("button");
    moviecbtn.setAttribute("id", "favBtn");

    let moviefav = document.createElement("svg");
    moviefav.setAttribute("class", "favorite-image");

    let movieImg = document.createElement("img");
    movieImg.setAttribute("id", "mytn");
    movieImg.src = Movie.image;
    if (Movie.user_fav == 1) {
      moviefav.innerHTML = favIconRed;
      moviefav.setAttribute("id", "redFaveIcon");
    } else {
      moviefav.innerHTML = favIcon;
      moviefav.setAttribute("id", "blackFaveIcon");
    }

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
    favVideo(moviecbtn, Movie.id, Movie, moviefav);
    moviecbtn.appendChild(moviefav);
    movieItem.append(movieTitle, moviecbtn);
    moviebox.append(moviebtn, movieItem);
    // moviecbtn.appendChild(movieBtnadd);

    cont.append(moviebox);
    moviebtn.appendChild(movieImg);
  });
  loader.style.display = "none";
}
let navLinks = document.querySelectorAll("#nav button");

async function updateActive(event) {
  navLinks.forEach(async function (link) {
    link.classList.remove("active");
  });

  event.target.classList.add("active");
}

navLinks.forEach(async function (link) {
  link.addEventListener("click", updateActive);
});

let currentHash = window.location.hash;

if (currentHash) {
  let currentLink = document.querySelector('a[href="' + currentHash + '"]');
  if (currentLink) {
    currentLink.classList.add("active");
  } else {
    navLinks[0].classList.add("active");
  }
}
////////////////
let modal2 = document.getElementById("myModal2");
2;
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
okBtn.addEventListener("click", () => {
  if (happyCt.checked) {
    let happy;

    filterCategories(happy, 3);
  } else if (sadCt.checked) {
    let sad;
    filterCategories(sad, 2);
  } else if (angryCt.checked) {
    let angry;
    filterCategories(angry, 4);
  }
  modal2.style.display = "none";
});
const movieButton = document.getElementById("myMovieButton");
const redFaveIcon = document.getElementById("redFaveIcon");
async function favVideo(moviecbtn, id, Movie, moviefav) {
  moviecbtn.addEventListener("click", async () => {
    if (!userIdArr.includes(Movie.id)) {
      for (let i = 0; i < datas.length; i++) {
        if (Movie.id == datas[i].id) {
          userIdArr.push(Movie.id);
          localStorage.setItem("userId", JSON.stringify(userIdArr));
          try {
            let response = await fetch("favorite.php", {
              method: "POST",
              body: JSON.stringify({
                id: 1,
                userId: 1,
                movie_id: Movie.id,
              }),
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
            });

            if (response.ok) {
              console.log("Request successful");
              let result = await response.json();
              console.log(result);
              console.log(moviefav);
              moviefav.innerHTML = favIconRed;
            } else {
              console.error("Request failed", response.statusText);
            }
          } catch (error) {
            console.error("Error occurred", error);
          }
        }
      }
    } else {
      const response = await fetch("favorite.php", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          userId: 1,
          movie_id: Movie.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Success:", data);
        moviefav.innerHTML = favIcon;

        userIdArr = userIdArr.filter((item) => item != Movie.id);
        localStorage.setItem("userId", JSON.stringify(userIdArr));
      } else {
        console.error("Error:", data);
      }
    }
  });
}

console.log("movie");

let favIconRed = `<svg id= "iconRed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2
 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
 <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 
 36.5 300.6 51.4 268 84L256 96 244
 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>`;
let favIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`;
