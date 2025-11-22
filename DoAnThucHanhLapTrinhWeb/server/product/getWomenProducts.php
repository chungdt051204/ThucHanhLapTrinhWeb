<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
require_once("../model/connect.php");
$conn = connectdb();
$sql = "SELECT * FROM products WHERE category_id = 1";
$stmt = $conn->prepare($sql);
$stmt->execute();
$arrProduct = $stmt->fetchAll(PDO::FETCH_ASSOC);
$conn = null;
http_response_code(200);
echo json_encode($arrProduct);   
?>