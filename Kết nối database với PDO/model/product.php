<?php
    function getProducts(){
        $conn = connectDB();
        $sql = "SELECT * FROM products";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $arrProduct = $stmt->fetchAll();
        return $arrProduct;
    }
 ?>