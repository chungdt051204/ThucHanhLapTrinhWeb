<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true"); 
    require_once("../model/connect.php");
    $conn = connectdb();
    $sql = "SELECT * FROM products LIMIT 25,40";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($products);
 ?>