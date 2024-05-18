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

$method = $_SERVER['REQUEST_METHOD'];
error_log("HTTP Method: $method");
error_log("Input: " . print_r($input, true));

if (!isset($input['id']) || !isset($input['userId']) || !isset($input['movie_id'])) {
    handleError('Invalid input');
}

$id = filter_var($input['id'], FILTER_VALIDATE_INT);
$userId = filter_var($input['userId'], FILTER_VALIDATE_INT);
$movieId = filter_var($input['movie_id'], FILTER_VALIDATE_INT);

error_log("Validated id: $id, userId: $userId, movieId: $movieId");

if ($id === false || $userId === false || $movieId === false) {
    handleError('Invalid input data');
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "movies";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    handleError('Database connection failed: ' . $conn->connect_error);
}

if ($method === 'POST') {
    $stmt = $conn->prepare('INSERT INTO user_favorite (user_id, movie_id) VALUES (?, ?)');
    if ($stmt === false) {
        handleError('Prepare statement failed: ' . $conn->error);
    }

    $bind = $stmt->bind_param('ii', $userId, $movieId);
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
} elseif ($method === 'DELETE') {
    $stmt = $conn->prepare('DELETE FROM user_favorite WHERE user_id = ? AND movie_id = ?');
    if ($stmt === false) {
        handleError('Prepare statement failed: ' . $conn->error);
    }

    $bind = $stmt->bind_param('ii', $userId, $movieId);
    if ($bind === false) {
        handleError('Bind parameters failed: ' . $stmt->error);
    }

    $exec = $stmt->execute();
    if ($exec) {
        echo json_encode(['success' => 'Record deleted successfully']);
    } else {
        handleError('Execute statement failed: ' . $stmt->error);
    }

    $stmt->close();
} else {
    handleError('Invalid request method');
}

$conn->close();
?>
