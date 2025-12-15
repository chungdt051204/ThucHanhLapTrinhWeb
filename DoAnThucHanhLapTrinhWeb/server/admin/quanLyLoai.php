<?php
//Cho phép truy cập khác nguồn gốc
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true"); 
//Cho phép các Phương thức (Methods) cần thiết
header("Access-Control-Allow-Methods: POST, DELETE, PUT, OPTIONS");
//Cho phép các header, nếu client dùng form data để gửi dữ liệu thì không cần
header("Access-Control-Allow-Headers: Content-Type"); 
require_once("../model/connect.php");
$conn = connectdb();
//Xử lý yêu cầu preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit(0); 
}
if($_SERVER["REQUEST_METHOD"] === "POST"){
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);
    $category_name = $data["category_name"] ?? "";
    
    if($category_name !== ""){
        $sql = "INSERT INTO categories(category_name) VALUES(?)";
        $stmt = $conn->prepare($sql);
        if($stmt->execute([$category_name])){
            http_response_code(200); 
            echo json_encode(["message" => "Thêm loại sản phẩm '{$category_name}' thành công."]);
        }
        else{
            http_response_code(500); 
            echo json_encode(["message" => "Không thêm sản phẩm được (Lỗi cơ sở dữ liệu)."]);
    }
    } else {
        // *** ĐIỀU KIỆN ELSE QUAN TRỌNG: Trả về JSON khi thiếu dữ liệu ***
        http_response_code(400); 
        echo json_encode(["message" => "Vui lòng nhập tên loại sản phẩm."]);
    }
}
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = $_GET["category_id"] ?? "";
    if ($id === "") {
        http_response_code(400);
        echo json_encode(["message" => "Thiếu category_id"]);
        exit();
    }
    // Check ràng buộc
    $sqlCheck = "SELECT COUNT(*) FROM products WHERE category_id = ?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->execute([$id]);
    $productCount = $stmtCheck->fetchColumn();
    if ($productCount > 0) {
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
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    $id = $_GET["category_id"] ?? "";
    $name = $data['category_name'] ?? '';

    if (trim($name) === '') {
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
$conn = null;
?>