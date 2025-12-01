<?php
    //Cho phép truy cập khác nguồn gốc
    header("Access-Control-Allow-Origin: http://localhost:5173"); 
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
    //Nếu client gửi dữ liệu với method POST thì mới thực hiện
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $fullName = $_POST["fullName"] ?? "";
        $username = $_POST["username"] ?? "";
        $password = md5($_POST["password"]) ?? "";//Mã hóa mật khẩu
        $email = $_POST["email"] ?? "";
        $phone = $_POST["phone"] ?? "";
        $gender = $_POST["gender"] ?? "";
        $isGender = $gender === "nam" ? 1 : 0;
        $Types = ["jpg", "png"];
        $avatar = $_FILES["avatar"]["name"] ?? "";
        // $ext = pathinfo($avatar, PATHINFO_EXTENSION);
        // if(!in_array($ext, $Types)){
        //     http_response_code(500);
        //     echo json_encode(["message" => "Định dạng file không hợp lệ"]);
        // }
        //Lưu file về thư mục images của server
        $fileTemp = $_FILES["avatar"]["tmp_name"];
        $fileSave = "../images/$avatar";
        move_uploaded_file($fileTemp, $fileSave);
        $sql = "SELECT email FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$email]);
        $emailInDatabase = $stmt -> fetchColumn();
        if(!$emailInDatabase){
            $sql1 = "INSERT INTO users(fullName, username, password, email, phone, gender, avatar) 
            VALUES(?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($sql1);
            $stmt->execute([$fullName, $username, $password, $email, $phone, $isGender, $avatar]);
            http_response_code(200);
            echo json_encode("Đăng ký thành công");
        }
        else{
            http_response_code(400);
            echo json_encode(["message" => "Email này đã tồn tại"]);
        }
    } 
    $conn = null;
?>