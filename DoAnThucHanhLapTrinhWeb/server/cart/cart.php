<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true"); 
    require_once("../model/connect.php");
    $conn = connectdb();
    $user_id = $_GET["user_id"] ?? "";
    $sql = "SELECT 
    p.name, 
    p.image_url, 
    p.price, 
    ot.order_item_id,
    ot.quantity,
    p.price * ot.quantity AS total
FROM 
    orders o 
INNER JOIN 
    order_items ot ON o.order_id = ot.order_id
INNER JOIN 
    products p ON ot.product_id = p.product_id 
WHERE 
    o.user_id = ?";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute([$user_id]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($cartItems);
 ?>