<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
require_once("../model/connect.php");
$conn = connectdb();
$productId = $_GET["product_id"] ?? "";
$categoryId = $_GET["category_id"] ?? "";
$searchSuggestion = $_GET["name"] ?? "";
$price = $_GET["price"] ?? "";
$whereClause = "";
//Lấy 1 sản phẩm theo product_id
if($productId){
    $sql = "SELECT p.*, c.category_id, c.category_name FROM products p INNER JOIN categories c ON p.category_id = c.category_id WHERE product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$productId]);
    $productWithId = $stmt->fetch(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($productWithId); 
}
// else if($price && $categoryId){
//     if($price === "low"){
//         $sql = "SELECT p.*, c.category_name FROM products p INNER JOIN categories c ON p.category_id = c.category_id WHERE p.category_id = ? AND p.price < 100";
//         $stmt = $conn->prepare($sql);
//         $stmt->execute([$categoryId]);
//         $productsWithLowPrice = $stmt->fetchAll(PDO::FETCH_ASSOC);
//         http_response_code(200);
//         echo json_encode($productWithLowPrice); 
//     }
//     else if($price === "medium"){
//         $sql = "SELECT p.*, c.category_name FROM products p INNER JOIN categories c ON p.category_id = c.category_id WHERE p.category_id = ? AND p.price BETWEEN 200 AND 400";
//         $stmt = $conn->prepare($sql);
//         $stmt->execute([$categoryId]);
//         $productsWithMediumPrice = $stmt->fetchAll(PDO::FETCH_ASSOC);
//         http_response_code(200);
//         echo json_encode($productsWithMediumPrice); 
//     }
//     else if($price === "high"){
//         $sql = "SELECT p.*, c.category_name FROM products p INNER JOIN categories c ON p.category_id = c.category_id WHERE p.category_id = ? AND p.price > 400";
//         $stmt = $conn->prepare($sql);
//         $stmt->execute([$categoryId]);
//         $productsWithHighPrice = $stmt->fetchAll(PDO::FETCH_ASSOC);
//         http_response_code(200);
//         echo json_encode($productsWithHighPrice); 
//     }
// }
//Lấy sản phẩm theo category_id
else if($categoryId){
    $sql = "SELECT p.*, c.category_name FROM products p INNER JOIN categories c ON p.category_id = c.category_id WHERE p.category_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$categoryId]);
    $productsWithCategoryId = $stmt->fetchAll(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($productsWithCategoryId); 
}
//Tìm kiếm gần đúng và chính xác theo từ khóa tìm kiếm
else if($searchSuggestion){
    $sql = "SELECT name, price, image_url FROM products WHERE name LIKE ?"; 
    $stmt = $conn->prepare($sql);
    $searchParam = '%' . $searchSuggestion . '%'; 
    $stmt->execute([$searchParam]);
    $productsWithSearchSuggestion = $stmt->fetchAll(PDO::FETCH_ASSOC); 
    http_response_code(200);
    echo json_encode($productsWithSearchSuggestion);   
}
//Lấy tất cả sản phẩm
else{
    $sql = "SELECT p.*, c.category_id, c.category_name FROM products p INNER JOIN categories c ON p.category_id = c.category_id ORDER BY p.category_id asc LIMIT 0,25";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($products); 
}
?>
