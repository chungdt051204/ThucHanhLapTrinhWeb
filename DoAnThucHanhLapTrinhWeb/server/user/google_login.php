<?php
// Bật báo cáo lỗi (Giữ lại để thấy lỗi PHP)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ***************************************************************
// PHẦN 1: CẤU HÌNH HEADERS VÀ SESSION
// ***************************************************************

// Cấu hình CORS
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();
header('Content-Type: application/json');

// ***************************************************************
// PHẦN 2: LOGIC XỬ LÝ CHÍNH
// ***************************************************************

// <<< CLIENT ID CỦA BẠN >>>
$CLIENT_ID = '790521733798-ukk6t9ok55hgp1sp0843j5ntjrcgevj1.apps.googleusercontent.com'; 

$data = json_decode(file_get_contents("php://input"), true);
$id_token = $data['id_token'] ?? null;

if (!$id_token) {
    http_response_code(400);
    echo json_encode(['message' => 'Lỗi: ID Token không được cung cấp']);
    exit;
}

try {
    // TẠO BIẾN CHO PHÉP GỠ LỖI ĐƯỜNG DẪN DỄ DÀNG HƠN
    $autoloadPath = __DIR__ . '/../../vendor/autoload.php'; // Thử 2 cấp lùi

    // 1. KIỂM TRA & REQUIRE VENDOR (Google API Client)
    if (!file_exists($autoloadPath)) {
        // Ném Exception nếu file không tìm thấy, để khối catch bắt và trả về JSON
        throw new Exception('Lỗi Fatal File: Không tìm thấy thư viện Composer tại: ' . $autoloadPath);
    }
    require_once $autoloadPath;

    // 2. KIỂM TRA & REQUIRE KẾT NỐI CSDL
    $connectPath = '../model/connect.php';
    if (!file_exists($connectPath)) {
        throw new Exception('Lỗi Fatal File: Không tìm thấy tệp kết nối CSDL tại: ' . $connectPath);
    }
    require_once $connectPath;
    
    // GỌI HÀM KẾT NỐI CSDL
    $pdo = connectdb();


    // ***************************************************************
    // 3. XÁC MINH TOKEN VÀ LOGIC CSDL (GIỮ NGUYÊN)
    // ***************************************************************

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
            $user_id = $user['user_id'];// A. Tồn tại: Đăng nhập
        if (empty($user['google_id'])) {
            $update_stmt = $pdo->prepare("UPDATE users SET google_id = ? WHERE user_id = ?");
            $update_stmt->execute([$google_user_id, $user_id]);
            }

        } else {
        // B. Chưa tồn tại: Tự động Đăng ký
            $insert_stmt = $pdo->prepare("
            INSERT INTO users (username, email, google_id, role, created_at) 
            VALUES (?, ?, ?, 'user', NOW())
            ");
            $insert_stmt->execute([$name, $email, $google_user_id]);
            $user_id = $pdo->lastInsertId();
        }

        // 2. TẠO SESSION ĐĂNG NHẬP
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
    // Bắt và xử lý lỗi của PHP hoặc các Exception được ném (ví dụ: lỗi file, lỗi CSDL)
    http_response_code(500);
    echo json_encode(['message' => 'Đăng nhập Google thất bại (Server Error): ' . $e->getMessage()]);
}
?>