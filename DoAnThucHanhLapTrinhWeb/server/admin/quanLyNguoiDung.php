<?php
// Cho phép truy cập từ client React (CORS)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
// Cho phép các Phương thức (Methods) cần thiết
header("Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS");
// Cho phép các header (mở rộng để an toàn hơn)
header("Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

require_once("../model/connect.php");
$conn = connectdb();

// Xử lý yêu cầu preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit(0);
}

// Hàm tiện ích: đọc JSON body nếu có
function get_json_body() {
    $input = file_get_contents("php://input");
    if (!$input) return [];
    $data = json_decode($input, true);
    return is_array($data) ? $data : [];
}

// === XỬ LÝ GET: Lấy danh sách người dùng (có lọc theo vai trò) ===
if ($_SERVER["REQUEST_METHOD"] === "GET"){
    $role = $_GET["role"] ?? "";

    // Không trả về password
    $sql = "SELECT user_id, fullName, username, email, role, status FROM users";
    $params = [];
    
    if ($role !== "" && in_array($role, ["admin", "user"])) {
        $sql .= " WHERE role = ?";
        $params[] = $role;
    }

    try {
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        echo json_encode($users);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "message" => "Lỗi DB khi lấy danh sách người dùng: " . $e->getMessage(),
            "sqlstate" => $e->getCode()
        ]);
    }
    $conn = null;
    exit;
}

// === XỬ LÝ PUT: cập nhật status (active <-> inactive) ===
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $body = get_json_body();
    // Lấy user_id ưu tiên từ query string, nếu không có thì lấy từ body
    $id = $_GET["user_id"] ?? ($body['user_id'] ?? "");
    $status = $body['status'] ?? '';

    // Chấp nhận active hoặc inactive
    if ($id === "" || !in_array($status, ['active', 'inactive'])) {
        http_response_code(400);
        echo json_encode([
            'message' => 'Thiếu user_id hoặc trạng thái không hợp lệ.',
            'received' => ['user_id' => $id, 'status' => $status]
        ]);
        exit;
    }

    try {
        // Kiểm tra vai trò
        $sqlCheck = "SELECT role FROM users WHERE user_id = ?";
        $stmtCheck = $conn->prepare($sqlCheck);
        $stmtCheck->execute([$id]);
        $userRole = $stmtCheck->fetchColumn();

        if ($userRole === false) {
            http_response_code(404);
            echo json_encode(['message' => 'Người dùng không tồn tại.', 'user_id' => $id]);
            exit;
        }

        if ($userRole === 'admin') {
            http_response_code(403);
            echo json_encode(['message' => 'Không thể thay đổi trạng thái của tài khoản Admin.']);
            exit;
        }

        $sql = "UPDATE users SET status = ? WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt->execute([$status, $id])) {
            echo json_encode(['message' => 'Cập nhật trạng thái người dùng thành công.', 'user_id' => $id, 'status' => $status]);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Lỗi khi cập nhật trạng thái.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Lỗi cơ sở dữ liệu khi cập nhật.", "error" => $e->getMessage()]);
    }

    $conn = null;
    exit;
}

// === XỬ LÝ DELETE: xóa người dùng ===
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    $body = get_json_body();
    $id = $_GET["user_id"] ?? ($body['user_id'] ?? "");

    if ($id === "") {
        http_response_code(400);
        echo json_encode(["message" => "Thiếu user_id", "received" => $body]);
        exit();
    }

    try {
        // Kiểm tra tồn tại và vai trò
        $sqlCheck = "SELECT role FROM users WHERE user_id = ?";
        $stmtCheck = $conn->prepare($sqlCheck);
        $stmtCheck->execute([$id]);
        $userRole = $stmtCheck->fetchColumn();

        if ($userRole === false) {
            http_response_code(404);
            echo json_encode(['message' => 'Người dùng không tồn tại.', 'user_id' => $id]);
            exit;
        }

        if ($userRole === 'admin') {
            http_response_code(403);
            echo json_encode(['message' => 'Không thể xóa tài khoản Admin.']);
            exit;
        }

        $sqlDelete = "DELETE FROM users WHERE user_id = ?";
        $stmtDelete = $conn->prepare($sqlDelete);
        if ($stmtDelete->execute([$id])) {
            http_response_code(200);
            echo json_encode(["message" => "Xóa người dùng thành công", "user_id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Xóa người dùng thất bại"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Lỗi cơ sở dữ liệu khi xóa.", "error" => $e->getMessage()]);
    }

    $conn = null;
    exit;
}

$conn = null;
?>
