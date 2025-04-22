<?php
$conn = new mysqli("localhost", "root", "", "listanimekudb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>