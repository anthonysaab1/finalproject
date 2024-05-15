<?php
session_start();
if (!isset($_SESSION["user"])) {
   header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CHI.FILM</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css" />
    <link rel = "website icon" type="png" href="photos/minilogob.jpeg">
  </head>
  <body>




    <div class="whole-page">
      <div id="cart-section">

 
      <div id="loader"></div>
        <ul id="cart-items"></ul>
        <div class="movie-head">
        <div class="icon-star">
        <abbr title="What We Recommend">
        <button id="myBtn2" class="openModalwwr">WWR</button></abbr>
        </div>
       
       <img src="photos/weblogo.png" id="webLogo">
        <a href="logout.php" class="btn btn-warning logout-link" >Logout</a></div>

        <div class="button-mid" id="nav">
          <button class="ba active" id="btnAll" >All</button>
          <button class="ba" id="btnAction">Action</button>
          <button class="ba" id="btnComedy">Comedy</button>
          <button class="ba" id="btnDrama">Drama</button>
          <button class="ba" id="btnThriller">Thriller</button>
        </div>

        <div class="container" id="codes-container"></div>

        <div id="myModal" class="modal">
          <div id="modal-a" class="modal-content">
            <span id="close" class="close">&times;</span>
          </div>
        </div>

        <div id="myModals" class="modals">
          <div id="modal-b" class="modal-contents">
            <span id="closes" class="closes">&times;</span>
          </div>
        </div>
      
      </div>
  <div> <svg id= "iconRed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg></div>
        </div>
        



<!-- The Modal2 -->
<div id="myModal2" class="modal2">
  <!-- Modal2 content -->
  <div class="modal2-content">
    <div class="modal2-header">
      <span class="close2">&times;</span>
      <h2>How do you feel today?</h2>
    </div>
    <div class="modal2-body">
      <input type="radio" name="wwr" id="happyBtn" /><label
        for="happyBtn"
      >
        Happy</label
      ><br />
      <input type="radio" name="wwr" id="sadBtn" /><label
        for="sadBtn"
      >
        Sad</label
      ><br />
      <input type="radio" name="wwr" id="angryBtn" />
      <label for="angryBtn"> Angry</label><br />
      <button type="button" id="okBtn">Ok</button>
    </div>
    <div class="modal2-footer">
      <h3>If you don't sense anything, hit the x button </h3>
    </div>
  </div>
</div>


    <script src="script.js"></script>
  </body>
</html>
