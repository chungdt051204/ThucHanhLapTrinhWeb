<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
require_once("../model/connect.php");
$conn = connectdb();
$id = $_GET["id"] ?? "";
$sql = "SELECT * FROM products WHERE product_id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);
http_response_code(200);
echo json_encode($product);   
?>
