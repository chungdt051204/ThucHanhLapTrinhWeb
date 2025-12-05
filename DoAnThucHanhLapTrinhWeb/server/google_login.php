<?php
//CẤU HÌNH CƠ SỞ DỮ LIỆU VÀ COMPOSER
require_once("model/connect.php");
require_once  ("../vendor/autoload.php"); 
$conn = connectdb(); 
//CẤU HÌNH GOOGLE
$CLIENT_ID="479773514232-gn1q883tk2berunr0irpomrm96burot9.apps.googleusercontent.com"; 
//CẤU HÌNH CORS & SESSION
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type"); 
//Xử lý yêu cầu preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit(0); 
}
//Nếu client gửi dữ liệu với method POST thì mới thực hiện
if($_SERVER["REQUEST_METHOD"] === "POST"){
    if(!isset($_SESSION))
        session_start();
    //Đọc dữ liệu JSON gửi từ ReactJS
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    $idToken = $data['id_token'] ?? null;
    if (!$idToken) {
        http_response_code(400);
        echo json_encode("Thiếu ID Token.");
    }
    //Xác minh ID Token với Google ---
    $client = new Google_Client(['client_id' => $CLIENT_ID]);
    $payload = $client->verifyIdToken($idToken); 
    if ($payload) {
        $email = $payload['email'];
        $fullName = $payload['name'] ?? null;
        $avatar = $payload['picture'] ?? null;
        // Kiểm tra Người dùng
        $sql_select = "SELECT user_id, fullName, email FROM users WHERE email = ?";
        $stmt_select = $conn->prepare($sql_select);
        $stmt_select->execute([$email]);
        $userInDatabase = $stmt_select->fetch(PDO::FETCH_ASSOC);
        //Nếu tồn tại username thì cập nhật lại thông tin
        if($userInDatabase){
            $sql_update = "UPDATE users SET fullName = ?, avatar = ? WHERE email = ?";
            $stmt_update = $conn->prepare($sql_update);
            $stmt_update->execute([$fullName, $avatar, $email]);
            $user_id = $userInDatabase['user_id'];
        } 
        //Nếu chưa có thì thêm mới
        else {
            $username_base = explode('@', $email)[0];
            $username = $username_base . rand(100, 999); //tạo username từ email kèm theo 1 số ngẫu nhiên từ 100 - 999
            $placeholder_password = 'GOOGLE_AUTH_USER_PLACEHOLDER'; 
            $sql_insert = "INSERT INTO users (fullName, username, email, password, avatar) VALUES (?, ?, ?, ?, ?)";
            $stmt_insert = $conn->prepare($sql_insert);
            $stmt_insert->execute([$fullName, $username, $email, $placeholder_password, $avatar]);
        }
        //Thiết lập Phiên (Session) ---
        $_SESSION["user"] = ["user_id" => $user_id, "loginTime" => time()];
        // TRẢ VỀ THÀNH CÔNG CUỐI CÙNG
        http_response_code(200);
        echo json_encode("Đăng nhập thành công"); 
    } 
    //Nếu $payload rỗng
    else {
        http_response_code(401);
        echo json_encode("Xác minh Token thất bại: Payload rỗng");
    }
}
$conn = null;
?>