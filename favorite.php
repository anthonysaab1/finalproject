<?php
// Enable error reporting for debugging purposes
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set the content type to JSON
header('Content-Type: application/json');

// Function to handle and log errors, and return JSON response
function handleError($message) {
    error_log($message); // Log the error message to the server's error log
    echo json_encode(['error' => $message]);
    exit();
}

// Get the input data from the request body
$input = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    handleError('Invalid JSON input: ' . json_last_error_msg());
}

// Check if the required data is set in the input
if (isset($input['userId']) && isset($input['movie_id'])) {
    $userId = $input['userId'];
    $movie_id = $input['movie_id'];

    // Database connection (ensure to replace with your actual database credentials)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "movies";

    // Create a new MySQLi connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check for connection errors
    if ($conn->connect_error) {
        handleError('Database connection failed: ' . $conn->connect_error);
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare('INSERT INTO user_favorite (user_id, movie_id) VALUES (?, ?)');

    // Check if the preparation of the statement failed
    if ($stmt === false) {
        handleError('Prepare statement failed: ' . $conn->error);
    }

    // Bind parameters to the SQL statement
    $bind = $stmt->bind_param('ii', $userId, $movie_id);

    // Check if binding parameters failed
    if ($bind === false) {
        handleError('Bind parameters failed: ' . $stmt->error);
    }

    // Execute the statement
    $exec = $stmt->execute();

    // Check if the execution of the statement was successful
    if ($exec) {
        echo json_encode(['success' => 'Record added successfully']);
    } else {
        // Check for duplicate entry error
        if ($stmt->errno === 1062) {
            handleError('Duplicate entry for user and movie');
        } else {
            handleError('Execute statement failed: ' . $stmt->error);
        }
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    // Respond with an error if the input data is invalid
    handleError('Invalid input');
}
?>
