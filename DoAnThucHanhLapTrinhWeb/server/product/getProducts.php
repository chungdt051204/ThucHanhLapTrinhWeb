<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
require_once("../model/connect.php");
$conn = connectdb();

// Lấy tham số từ URL
$productId = $_GET["product_id"] ?? null; 
$categoryId = $_GET["category_id"] ?? null;
$searchSuggestion = $_GET["name"] ?? null;
$priceFilter = $_GET["price"] ?? null; 

// Khởi tạo các mảng cho mệnh đề WHERE và tham số Bind
$conditions = [];
$params = [];

//Tìm sản phẩm theo ID
if ($productId) {
    $sql = "SELECT p.*, c.category_id, c.category_name 
            FROM products p 
            INNER JOIN categories c ON p.category_id = c.category_id 
            WHERE product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$productId]);
    $productWithId = $stmt->fetch(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode(["data" => $productWithId]);
    exit(); 
}

//Xây dựng Mệnh đề WHERE Động (cho lọc và tìm kiếm)

// Lọc theo Category ID
if ($categoryId) {
    $conditions[] = "p.category_id = ?";
    $params[] = $categoryId;
}

// Lọc theo Giá (price)
if ($priceFilter) {
    if ($priceFilter === "low") {
        $conditions[] = "p.price < ?";
        $params[] = 200;
    } elseif ($priceFilter === "medium") {
        $conditions[] = "p.price BETWEEN ? AND ?";
        $params[] = 200;
        $params[] = 400;
    } elseif ($priceFilter === "high") {
        $conditions[] = "p.price > ?";
        $params[] = 400;
    }
    
}

// Tìm kiếm theo tên (Search Suggestion)
if ($searchSuggestion) {
    $conditions[] = "p.name LIKE ?";
    $params[] = '%' . $searchSuggestion . '%';
}

$sql = "SELECT p.*, c.category_id, c.category_name 
        FROM products p 
        INNER JOIN categories c ON p.category_id = c.category_id";

// Nối các điều kiện lại bằng từ khóa AND
if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

// Sắp xếp và Giới hạn (Pagination)
$sql .= " ORDER BY p.category_id ASC LIMIT 0, 25";

// Thực thi truy vấn 
$stmt = $conn->prepare($sql);
$stmt->execute($params); // Bind các tham số đã thu thập
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(["data" => $products]);
?>