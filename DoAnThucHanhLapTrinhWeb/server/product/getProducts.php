<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
require_once("../model/connect.php");
$conn = connectdb();
$productId = $_GET["product_id"] ?? "";
$categoryId = $_GET["category_id"] ?? "";
if($productId){
    $sql = "SELECT * FROM products WHERE product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$productId]);
    $productWithId = $stmt->fetch(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($productWithId); 
}
else if($categoryId){
    $sql = "SELECT * FROM products WHERE category_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$categoryId]);
    $productsWithCategory_Id = $stmt->fetchAll(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($productsWithCategory_Id); 
}
else{
    $sql = "SELECT * FROM products LIMIT 0,20";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($products); 
}
?>
