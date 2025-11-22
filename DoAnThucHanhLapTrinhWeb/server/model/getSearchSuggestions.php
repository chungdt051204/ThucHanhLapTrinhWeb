<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
$searchValue = $_GET["name"] ?? "";
$arrSearchSuggestion = []; 
if ($searchValue != "") {
    require_once("./connect.php");
    $conn = connectdb(); 
    $sql = "SELECT name, price, image_url FROM products WHERE name LIKE ? LIMIT 10"; 
    try {
        $stmt = $conn->prepare($sql);
        $searchParam = '%' . $searchValue . '%'; 
        $stmt->bindParam(1, $searchParam); 
        $stmt->execute();
        $arrSearchSuggestion = $stmt->fetchAll(PDO::FETCH_ASSOC);   
    } catch (PDOException $e) {
        // Ghi log lỗi
        http_response_code(500);
        $arrSearchSuggestion = ["error" => "Database query failed."]; 
    }
    $conn = null;
}
echo json_encode($arrSearchSuggestion); 
?>