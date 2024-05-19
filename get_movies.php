<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');   
}


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "movies";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$id = $_GET["id"];
$sql = "SELECT a.*,  (SELECT COUNT(id) FROM user_favorite WHERE user_id = 1 AND movie_id = a.id) AS user_fav FROM movies a";
$result = $conn->query($sql);

$movies = array();

if ($result->num_rows > 0) {
  
  while ($row = $result->fetch_assoc()) {
    $movies[] = $row;
  }
}


$conn->close();

echo json_encode($movies);die;

?>