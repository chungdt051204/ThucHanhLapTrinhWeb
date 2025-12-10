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
    $name = $_POST["name"] ?? "";
    $categoryId = $_POST["categoryId"] ?? "";
    $price = $_POST["price"] ?? "";
    $image = $_FILES["image"]["name"] ?? "";
    if($image){
        $fileTemp = $_FILES["image"]["tmp_name"];
        $fileSave = "../images/product/$image";
        move_uploaded_file($fileTemp, $fileSave);
        $sql = "INSERT INTO products(name, price, image_url, category_id) VALUES(?,?,?,?)";
        $stmt = $conn->prepare($sql);
        if($stmt->execute([$name, $price, $image, $categoryId])){
            http_response_code(200); 
            echo json_encode(["message" => "Thêm sản phẩm '{$image}' thành công."]);
        }
        else{
            http_response_code(500); 
            echo json_encode(["message" => "Không thêm sản phẩm được (Lỗi cơ sở dữ liệu)."]);
        }
    } 
}
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $id = $_GET["id"] ?? "";
    // Xóa
    $sqlDelete = "DELETE FROM products WHERE product_id = ?";
    $stmtDelete = $conn->prepare($sqlDelete);
    if ($stmtDelete->execute([$id])) {
        http_response_code(200);
        echo json_encode(["message" => "Xóa thành công"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Xóa thất bại"]);
    }
}
$id = $_GET["id"] ?? "";
//Giả lập method PUT
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $id) {
    $sql = "SELECT * FROM products WHERE product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id]);
    $productInDatabase = $stmt->fetch(PDO::FETCH_ASSOC);
    $name = $_POST["name"] !== "" ? $_POST["name"] : $productInDatabase["name"];
    $categoryId = $_POST["categoryId"] !== "" ? $_POST["categoryId"] : $productInDatabase["category_id"];
    $price = $_POST["price"] !== "" ? $_POST["price"] : $productInDatabase["price"];
    $image = $_FILES["image"]["name"]  ?? $productInDatabase["image_url"];
    if($image != $productInDatabase["image_url"]){
        $fileTemp = $_FILES["image"]["tmp_name"];
        $fileSave = "../images/product/$image";
        move_uploaded_file($fileTemp, $fileSave);
    }
    $sql = "UPDATE products SET name = ?, price = ?, image_url = ?, category_id = ? WHERE product_id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute([$name, $price, $image, $categoryId, $id])) {
        echo json_encode(['message' => 'Cập nhật thành công']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Lỗi cập nhật']);
    }
}
$conn = null;
?>