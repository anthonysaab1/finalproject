<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');


function handleError($message) {
    error_log($message); 
    echo json_encode(['error' => $message]);
    exit();
}
$input = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    handleError('Invalid JSON input: ' . json_last_error_msg());
}


if (isset($input['userId']) && isset($input['movie_id'])) {
    $userId = $input['userId'];
    $movie_id = $input['movie_id'];

    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "movies";

    // $sql = "SELECT a.*,  (SELECT COUNT(id) FROM user_favorite WHERE user_id = ".  $id ." AND movie_id = a.id) AS user_fav FROM movies a";
    $conn = new mysqli($servername, $username, $password, $dbname);

   
    if ($conn->connect_error) {
        handleError('Database connection failed: ' . $conn->connect_error);
    }

    $stmt = $conn->prepare('INSERT INTO user_favorite (user_id, movie_id) VALUES (?, ?)');

    
    if ($stmt === false) {
        handleError('Prepare statement failed: ' . $conn->error);
    }

   
    $bind = $stmt->bind_param('ii', $userId, $movie_id);

   
    if ($bind === false) {
        handleError('Bind parameters failed: ' . $stmt->error);
    }


    $exec = $stmt->execute();


    if ($exec) {
        echo json_encode(['success' => 'Record added successfully']);
    } else {

        if ($stmt->errno === 1062) {
            handleError('Duplicate entry for user and movie');
        } else {
            handleError('Execute statement failed: ' . $stmt->error);
        }
    }


    $stmt->close();
    $conn->close();
} else {

    handleError('Invalid input');
}
?>
