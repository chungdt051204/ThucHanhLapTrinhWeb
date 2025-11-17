<?php
function getproducts(){
    $conn = connectdb();
    if(!$conn) return [];

    $sql = "SELECT * FROM products ORDER BY product_id DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $arrProduct = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $conn = null;
    return $arrProduct;
}
?>
