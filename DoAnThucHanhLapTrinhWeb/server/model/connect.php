<?php
function connectdb(){
$servername = "127.0.0.1"; // Giữ IP đã sửa
$username = "root";
$password = ""; // Giữ nguyên rỗng
$dbname = "shopthoitrang";
try {
 $conn = new PDO("mysql:host=$servername;port=3306;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $th) {
throw new Exception("Lỗi kết nối CSDL: ".$th->getMessage()); 
}
return $conn;
}

