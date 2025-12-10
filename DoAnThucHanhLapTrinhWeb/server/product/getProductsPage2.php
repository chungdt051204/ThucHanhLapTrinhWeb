<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true"); 
    require_once("../model/connect.php");
    $conn = connectdb();
    $sql = "SELECT p.*, c.category_id, c.category_name FROM products p INNER JOIN categories c ON p.category_id = c.category_id ORDER BY p.category_id asc LIMIT 26, 100 ";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($products);
 ?>