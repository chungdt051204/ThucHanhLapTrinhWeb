<?php
    //Cho phép truy cập khác nguồn gốc
    header("Access-Control-Allow-Origin: http://localhost:5173"); 
    header("Access-Control-Allow-Credentials: true"); 
    //Cho phép các Phương thức (Methods) cần thiết
    header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
    //Cho phép các header, nếu client dùng form data để gửi dữ liệu thì không cần
    header("Access-Control-Allow-Headers: Content-Type"); 
    require_once("../model/connect.php");
    $conn = connectdb();
// Đảm bảo kết nối database ($conn) và các header CORS đã được thiết lập
//Xử lý yêu cầu preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit(0); 
}
//Lấy dữ liệu đơn hàng của người dùng hiện tại
if($_SERVER["REQUEST_METHOD"] === "GET"){
    $user_id = $_GET["user_id"] ?? "";
    $order_id = $_GET["order_id"] ?? "";
    $status = $_GET["status"] ?? "";
    if($user_id){
        $sql = "SELECT * FROM `order` WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$user_id]);
        $ordersWithUserId = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode(["data"=>$ordersWithUserId]);
    }
    else if($order_id){
        //Lấy lịch sử đơn hàng
        $sql = "SELECT * FROM order_status_history WHERE order_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$order_id]);
        //Lấy chi tiết đơn hàng
        $orderStatusHistoryWithOrderId = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $sql1 = "SELECT oi.*, p.name, p.image_url, p.stock_quantity, oi.price * oi.quantity AS tong FROM order_item oi JOIN products p ON oi.product_id = p.product_id WHERE order_id = ?";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->execute([$order_id]);
        $orderItemsWithOrderId = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode(["data" => $orderStatusHistoryWithOrderId, "data1" => $orderItemsWithOrderId]);
    }
    else if($status){
        $sql = "SELECT * FROM `order` WHERE status = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$status]);
        $ordersWithStatus = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode(["data" => $ordersWithStatus]);
    }
    else{
        $sql = "SELECT * FROM `order`";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode(["data" => $orders]);
    }
}
//Xử lý đặt hàng
else if($_SERVER["REQUEST_METHOD"] === "POST"){
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Lỗi: Dữ liệu JSON không hợp lệ."]);
        exit();
    }
    // Lấy dữ liệu từ mảng $data
    $user_id = $data["user_id"] ?? null; 
    $fullName = $data["fullName"] ?? "";
    $phone = $data["phone"] ?? "";
    $address = $data["address"] ?? "";
    $paymentMethod = $data["paymentMethod"] ?? "";
    $total_amount = $data["tong"] ?? 0;
    $arrItem = $data["arrItem"] ?? []; 
    try {
        $conn->beginTransaction();
        // Lưu ý: Đổi tên bảng `order` thành `order` hoặc dùng backtick `order`
        $sql_order = "INSERT INTO `order`(user_id, fullName, phone, paymentMethod, status, total_amount, shipping_address) 
                      VALUES(?,?,?,?,?,?,?)";
        $stmt_order = $conn->prepare($sql_order);
        $stmt_order->execute([$user_id, $fullName, $phone, $paymentMethod, "PENDING", $total_amount, $address]);
        $order_id = $conn->lastInsertId(); // Lấy ID đơn hàng vừa tạo 
        //Thêm lịch sử đơn hàng
        $sql = "INSERT INTO order_status_history(order_id, status_change_to) VALUES(?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$order_id, "PENDING"]);
        //Thêm chi tiết đơn hàng
        $sql_item = "INSERT INTO order_item (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
        $stmt_item = $conn->prepare($sql_item);
        foreach ($arrItem as $item) {
            $stmt_item->execute([
                $order_id, 
                $item['product_id'], 
                $item['quantity'], 
                $item['price'] 
            ]);
        }
        //Xóa các item đã đặt trong giỏ hàng
        $arrItemId = array_column($arrItem, 'cart_item_id'); 
        $arrItemIdString = implode(",", $arrItemId);
        $sql_delete = "DELETE FROM cart_item WHERE cart_item_id IN ($arrItemIdString)";
        $stmt_delete = $conn->prepare($sql_delete);
        $stmt_delete->execute();
        $conn->commit();
        //Trả về thành công
        http_response_code(200); 
        echo json_encode(["message" => "Đặt hàng thành công"]);
    } catch (PDOException $e) {
        // Rollback nếu có lỗi SQL
        $conn->rollBack();
        http_response_code(500);
        echo json_encode(["message" => "Lỗi đặt hàng: " . $e->getMessage()]);
    }
}
//Cập nhật trạng thái đơn hàng
else if($_SERVER["REQUEST_METHOD"] === "PUT"){
    $order_id = $_GET["order_id"];
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);
    $status = $data["status"] ?? "";
    try {
        //Lấy dữ liệu số lượng và tồn kho của từng sản phẩm trong đơn hàng
    $sql = "SELECT oi.quantity, p.product_id, p.stock_quantity FROM `order` o JOIN order_item oi ON o.order_id = oi.order_id JOIN products p ON oi.product_id = p.product_id WHERE o.order_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$order_id]);
    $orderItemWithOrderId = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $has_stock_issue = false;
    //Lấy trạng thái đơn hàng user chọn
    $sql1 = "SELECT status FROM `order` WHERE order_id = ?";
    $stmt1 = $conn->prepare($sql1);
    $stmt1->execute([$order_id]);
    $orderWithOrderId = $stmt1->fetch(PDO::FETCH_ASSOC);
    //Xử lý hủy đơn hàng phía user khi status đơn hàng là PENDING hoặc OUT_OF_STOCk
    if($orderWithOrderId["status"] === "PENDING" || $orderWithOrderId["status"] === "OUT_OF_STOCK"){
        $conn->beginTransaction();
        $sql1 = "UPDATE `order` SET status = ? WHERE order_id = ?";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->execute([$status, $order_id]);
        //Thêm lịch sử đơn hàng
        $sql2 = "INSERT INTO order_status_history(order_id, status_change_to) VALUES(?,?)";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute([$order_id, $status]);
        $conn->commit();
        http_response_code(200);
        echo json_encode(["message" => "Cập nhật trạng thái đơn hàng thành công"]);
    }
    //Nếu trạng thái đang chuyển từ PENDING sang PROCESSING thì mới có kiểm tra tồn kho
    else if($status === "PROCESSING"){
        $conn->beginTransaction();
            //Kiểm tra tồn kho từng sản phẩm trong đơn hàng
            foreach($orderItemWithOrderId as $v){
                if($v["stock_quantity"] < $v["quantity"])
                    $has_stock_issue = true;
            }
            //Nếu tồn kho không đủ thì cập nhật trạng thái thành OUT_OF_STOCK thêm vào lịch sử đơn hàng và báo lỗi
            if($has_stock_issue){
                $conn->rollBack();
                //Bắt đầu transaction mới để ghi trạng thái lỗi
                $conn->beginTransaction();
                //Cập nhật trạng thái đơn hàng
                $sql1 = "UPDATE `order` SET status = ? WHERE order_id = ?";
                $stmt1 = $conn->prepare($sql1);
                $stmt1->execute(["OUT_OF_STOCK", $order_id]);
                //Thêm lịch sử đơn hàng
                $sql2 = "INSERT INTO order_status_history(order_id, status_change_to) VALUES(?,?)";
                $stmt2 = $conn->prepare($sql2);
                $stmt2->execute([$order_id, "OUT_OF_STOCK"]);
                $conn->commit();
                http_response_code(400);
                echo json_encode(["message" => "Tồn kho không đủ số lượng để đáp ứng"]);
            }
            else{
                //Trừ tồn kho
                foreach($orderItemWithOrderId as $v){
                    $sql = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?";
                    $stmt = $conn->prepare($sql);
                    $stmt->execute([$v["quantity"], $v["product_id"]]);
                }
                //Cập nhật trạng thái đơn hàng
                $sql1 = "UPDATE `order` SET status = ? WHERE order_id = ?";
                $stmt1 = $conn->prepare($sql1);
                $stmt1->execute([$status, $order_id]);
                //Thêm lịch sử đơn hàng
                $sql2 = "INSERT INTO order_status_history(order_id, status_change_to) VALUES(?,?)";
                $stmt2 = $conn->prepare($sql2);
                $stmt2->execute([$order_id, $status]);
                $conn->commit();
                http_response_code(200);
                echo json_encode(["message" => "Cập nhật trạng thái đơn hàng thành công"]);
            }
    }
    //Nếu chuyển sang trạng thái CANCELLED thì cần phải hoàn lại tồn kho
    else if($status === "CANCELLED"){
        $conn->beginTransaction();
        //Hoàn lại tồn kho
        foreach($orderItemWithOrderId as $v){
            $sql = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$v["quantity"], $v["product_id"]]);
        }
        //Cập nhật trạng thái đơn hàng
        $sql1 = "UPDATE `order` SET status = ? WHERE order_id = ?";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->execute([$status, $order_id]);
        //Thêm lịch sử đơn hàng
        $sql2 = "INSERT INTO order_status_history(order_id, status_change_to) VALUES(?,?)";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->execute([$order_id, $status]);
        $conn->commit();
        http_response_code(200);
        echo json_encode(["message" => "Cập nhật trạng thái đơn hàng thành công"]);
    }
    //Nếu chuyển sang các trạng thái khác thì chỉ cần cập nhật lại trạng thái đơn hàng và thêm 1 dòng dữ liệu cho lịch sử đơn hàng
    else{
        $conn->beginTransaction();
        //Cập nhật trạng thái đơn hàng
        $sql = "UPDATE `order` SET status = ? WHERE order_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$status, $order_id]);
        //Thêm lịch sử đơn hàng
        $sql1 = "INSERT INTO order_status_history(order_id, status_change_to) VALUES(?,?)";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->execute([$order_id, $status]);
        $conn->commit();
        http_response_code(200);
        echo json_encode(["message" => "Cập nhật trạng thái đơn hàng thành công"]);
    }
    } catch (\Throwable $th) {
        if ($conn->inTransaction()) {
            $conn->rollBack();
        }
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Lỗi hệ thống khi xử lý yêu cầu.", "error_detail" => $th->getMessage()]);
    }   
}
$conn = null;
 ?>