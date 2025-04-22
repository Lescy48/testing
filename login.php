<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        echo "Please fill in both fields.";
        exit;
    }

    // Check if the username exists
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    if (!$stmt) {
        echo "Error: Database query error.";
        exit;
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $stored_password);
        $stmt->fetch();
        
        if ($password === $stored_password) {
            $_SESSION['user_id'] = $id;
            echo "success";
        } else {
            echo "Invalid username or password.";
        }
    } else {
        echo "Invalid username or password.";
    }

    $stmt->close();
    $conn->close();
}
?>