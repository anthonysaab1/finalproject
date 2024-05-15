<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "movies";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM movies_categories";
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
