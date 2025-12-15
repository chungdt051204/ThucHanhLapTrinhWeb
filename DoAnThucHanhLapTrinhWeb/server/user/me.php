<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true"); 
    require_once("../model/connect.php");
    $conn = connectdb();
    if(!isset($_SESSION)){
        session_start();
    }
    if(isset($_SESSION["user"])){
        $sql = "SELECT * FROM users WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$_SESSION["user"]["user_id"]]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($user);
    }
    else
        http_response_code(401);
 ?>