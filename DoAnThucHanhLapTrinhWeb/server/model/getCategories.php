<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
require_once("./connect.php");
$conn = connectdb();
$sql = "SELECT * FROM categories";
$stmt = $conn->prepare($sql);
$stmt->execute();
$arrCategory = $stmt->fetchAll(PDO::FETCH_ASSOC);
$conn = null;
http_response_code(200);
echo json_encode($arrCategory);   
?>