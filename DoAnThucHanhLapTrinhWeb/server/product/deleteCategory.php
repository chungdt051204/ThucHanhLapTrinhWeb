<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../model/connect.php");
$conn = connectdb();

// Preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit(0);
}

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    $id = $data["category_id"] ?? "";

    if ($id === "") {
        http_response_code(400);
        echo json_encode(["message" => "Thiếu category_id"]);
        exit();
    }

    // Check ràng buộc
    $sqlCheck = "SELECT product_id FROM products WHERE category_id = ?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->execute([$id]);

    if ($stmtCheck->rowCount() > 0) {
        http_response_code(400);
        echo json_encode([
            "message" => "Không thể xóa, loại đang có sản phẩm"
        ]);
        exit();
    }

    // Xóa
    $sqlDelete = "DELETE FROM categories WHERE category_id = ?";
    $stmtDelete = $conn->prepare($sqlDelete);

    if ($stmtDelete->execute([$id])) {
        http_response_code(200);
        echo json_encode(["message" => "Xóa thành công"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Xóa thất bại"]);
    }
}
?>
