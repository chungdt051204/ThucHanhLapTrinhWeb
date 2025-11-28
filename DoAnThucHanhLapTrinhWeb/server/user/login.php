<?php
//Cho phép truy cập khác nguồn gốc
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true"); 
//Cho phép các Phương thức (Methods) cần thiết
header("Access-Control-Allow-Methods: POST, OPTIONS");
//Cho phép các header, nếu client dùng form data để gửi dữ liệu thì không cần
header("Access-Control-Allow-Headers: Content-Type"); 
require_once("../model/connect.php");
$conn = connectdb();
//Xử lý yêu cầu preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit(0); 
}
if($_SERVER["REQUEST_METHOD"] === "POST"){
    if(!isset($_SESSION))
        session_start();
    $email = $_POST["email"] ?? "gà";
    $password = $_POST["password"] ?? "";
    if($email !== "" && $password !== ""){
        $sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$email, md5($password)]);
        $userInDatabase = $stmt->fetch();
        if($userInDatabase){
            //Thiết lập Phiên (Session) ---
            $_SESSION["user"] = ["email" => $email, "loginTime" => time()];
            http_response_code(200);
            echo json_encode("Đăng nhập thành công");
        }
        else{
            http_response_code(401);
            echo json_encode("Sai thông tin đăng nhập");
        }
   }
} 
$conn = null;
?>