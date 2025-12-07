<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../model/connect.php");
$conn = connectdb();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    $id = $data['category_id'] ?? '';
    $name = $data['category_name'] ?? '';

    if ($id === '' || trim($name) === '') {
        http_response_code(400);
        echo json_encode(['message' => 'Thiếu dữ liệu']);
        exit;
    }

    $sql = "UPDATE categories SET category_name = ? WHERE category_id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([$name, $id])) {
        echo json_encode(['message' => 'Cập nhật thành công']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Lỗi cập nhật']);
    }
}
