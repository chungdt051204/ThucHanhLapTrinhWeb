<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);


header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");



if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); 
    exit(); 
}

$CLIENT_ID = '790521733798-ukk6t9ok55hgp1sp0843j5ntjrcgevj1.apps.googleusercontent.com'; 

$data = json_decode(file_get_contents("php://input"), true);
$id_token = $data['id_token'] ?? null;

if (!$id_token) {
    http_response_code(400);
    echo json_encode(['message' => 'Lỗi: ID Token không được cung cấp']);
    exit;
}

try {
session_start();
header('Content-Type: application/json');
    // $autoloadPath = __DIR__ . '/../../vendor/autoload.php';


    // if (!file_exists($autoloadPath)) {

    //     throw new Exception('Lỗi Fatal File: Không tìm thấy thư viện Composer tại: ' . $autoloadPath);
    // }
    // require_once $autoloadPath;


    // $connectPath = '../../model/connect.php';
    // if (!file_exists($connectPath)) {
    //     throw new Exception('Lỗi Fatal File: Không tìm thấy tệp kết nối CSDL tại: ' . $connectPath);
    // }
    // require_once $connectPath;
    $pdo = connectdb();
    
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Test file load OK.']);
    exit;
    

    $client = new Google_Client(['client_id' => $CLIENT_ID]);
    $payload = $client->verifyIdToken($id_token);

    if ($payload) {
        $email = $payload['email'];
        $name = $payload['name'];
        $google_user_id = $payload['sub'];
        $stmt = $pdo->prepare("SELECT user_id, username, password, google_id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        $user_id = null;

        if ($user) {
            $user_id = $user['user_id'];
        if (empty($user['google_id'])) {
            $update_stmt = $pdo->prepare("UPDATE users SET google_id = ? WHERE user_id = ?");
            $update_stmt->execute([$google_user_id, $user_id]);
            }

        } else {
            $insert_stmt = $pdo->prepare("
            INSERT INTO users (username, email, google_id, role, created_at) 
            VALUES (?, ?, ?, 'user', NOW())
            ");
            $insert_stmt->execute([$name, $email, $google_user_id]);
            $user_id = $pdo->lastInsertId();
        }

        if ($user_id) {
            $_SESSION['user_id'] = $user_id;
            $_SESSION['logged_in'] = true;
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Đăng nhập Google thành công!',
                'user_id' => $user_id,
                'user_name' => $name
            ]);
         } else {
            throw new Exception("Lỗi tạo/tìm user ID.");
        }

    } else {
         http_response_code(401);
         echo json_encode(['message' => 'ID Token không hợp lệ.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Đăng nhập Google thất bại (Server Error): ' . $e->getMessage()]);
}
?>