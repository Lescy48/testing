<?php
include 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_SESSION['user_id']; // Pastikan sudah ada session user login
    $commentText = $_POST['comment_text'];
    $parentId = $_POST['parent_id'] ? $_POST['parent_id'] : null;

    $stmt = $conn->prepare("INSERT INTO comments (user_id, comment_text, parent_id) VALUES (?, ?, ?)");
    $stmt->bind_param("isi", $userId, $commentText, $parentId);
    $stmt->execute();
    header("Location: cicak.html");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_comment'])) {
    $commentId = $_POST['comment_id'];
    $userId = $_SESSION['user_id'];

    // Hanya user yang mengirim komentar bisa menghapusnya
    $stmt = $conn->prepare("DELETE FROM comments WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $commentId, $userId);
    $stmt->execute();
    header("Location: cicak.html");
    exit();
}
?>