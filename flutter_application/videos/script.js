const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Mzk2YmRkZmZhNzE2MjU1MTg0YzQyYzhkNDM1M2YyYSIsInN1YiI6IjY1YzFmNWU3OGU4ZDMwMDE2Mjc3ZTMyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-4tl7niSYZ2UzY-MJxB1jOVNukW_Sb6NS3OjjqlSHtE",
  },
};
/// <script src"videos/script.js"> </script>
const videos = {
  0: "videos/THE BEEKEEPER _ Official Restricted Trailer.mp4",
  1: "videos/Aquaman and the Lost Kingdom _ Trailer.mp4",
  2: "videos/Lift _ Official Trailer _ Netflix.mp4",
  3: "videos/Migration _ Official Trailer 3.mp4",
  4: "videos/Badland Hunters _ Official Teaser _ Netflix.mp4",
  5: "videos/Sixty Minutes _ Official Trailer _ Netflix.mp4",
  6: "videos/THE BOY AND THE HERON _ Official English Trailer.mp4",
  7: "videos/Wish _ Official Trailer.mp4",
  8: "videos/Wonka _ Trailer #2.mp4",
  9: "videos/ANYONE BUT YOU - Official Trailer (HD) (1).mp4",
  10: "videos/The Underdoggs - Official RedBand Trailer _ Prime Video.mp4",
  11: "videos/Role Play - Official Trailer _ Prime Video.mp4",
  12: "videos/Oppenheimer _ New Trailer.mp4",
  13: "videos/POOR THINGS _ Official Trailer _ Searchlight Pictures.mp4",
  14: "videos/Monsters 103 Mercies Dragon Damnation _ Official Trailer _ Netflix.mp4",
  15: "videos/The Painter _ Official Trailer _ Paramount Movies.mp4",
  16: "videos/Argylle _ Official Trailer.mp4",
  17: "videos/The Bricklayer _ Official Trailer (HD) _ Vertical.mp4",
  18: "videos/ONE MORE SHOT Official Trailer (2024) Scott Adkins, Michael Jai White Action Movie HD.mp4",
  19: "videos/THE _NSYNC SCENE from Trolls Band Together! (_Better Place_ Credits Sequence) _ TROLLS BAND TOGETHER.mp4",
  20: "videos/Role Play - Official Trailer _ Prime Video.mp4",
};

fetch("https://api.themoviedb.org/3/movie/changes?page=1", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

function add(item) {
  var cartList = document.getElementById("cart-items");
  var existingCartItem = findCartItemByName(item);

  if (existingCartItem) {
    var quantityElement = existingCartItem.querySelector(".quantity");
    var quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity;
  } else {
    var cartItem = document.createElement("li");
    cartItem.innerHTML = `<span class="item-name">${item}</span> `;

    var remove = document.createElement("button");
    remove.textContent = "-";
    remove.onclick = function () {
      removeFromCart(cartItem);
    };
    alert(`THIS VIDEO (${item}) IS ADDED TO YOUR FAVORITE LIST`);

    cartItem.appendChild(remove);
    cartList.appendChild(cartItem);
  }
}

function removeFromCart(cartItem) {
  var cartList = document.getElementById("cart-items");
  cartList.removeChild(cartItem);
}

function findCartItemByName(item) {
  var cartList = document.getElementById("cart-items");
  var cartItems = cartList.getElementsByTagName("li");

  for (var i = 0; i < cartItems.length; i++) {
    var itemElement = cartItems[i].querySelector(".item-name");
    if (itemElement && itemElement.textContent === item) {
      return cartItems[i];
    }
  }

  return null;
}

function clearCart() {
  var cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  localStorage.removeItem("cartItems");
}
/////////////////////////

var modal = document.getElementById("myModal");

var btn = document.querySelectorAll("#myBtn");
console.log(btn);

var span = document.getElementById("close");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document
      .getElementById("modal-a")
      .removeChild(document.getElementById("vid"));
  }
};

btn.forEach((element, index) => {
  element.onclick = function () {
    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
      document
        .getElementById("modal-a")
        .removeChild(document.getElementById("vid"));
    };
    var video = document.createElement("video");

    video.width = 800;
    video.height = 600;
    video.controls = true;
    video.setAttribute("id", "vid");
    var source = document.createElement("source");
    source.src = videos[index];
    source.type = "video/mp4";

    video.appendChild(source);
    document.getElementById("modal-a").appendChild(video);
  };
});
function addSourceToVideo(element, src, type) {
  var source = document.createElement("source");

  source.src = src;
  source.type = type;

  element.appendChild(source);
}
console.dir(document);
