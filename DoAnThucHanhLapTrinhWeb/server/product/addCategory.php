<?php
//Cho phép truy cập khác nguồn gốc
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true"); 
//Cho phép các Phương thức (Methods) cần thiết
header("Access-Control-Allow-Methods: POST, OPTIONS");
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
            http_response_code(201); // Nên dùng 201 Created
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
$conn = null;
?>