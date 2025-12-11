<?php
    //Cho phép truy cập khác nguồn gốc
    header("Access-Control-Allow-Origin: http://localhost:5173"); 
    header("Access-Control-Allow-Credentials: true"); 
    //Cho phép các Phương thức (Methods) cần thiết
    header("Access-Control-Allow-Methods: POST, DELETE, PUT, OPTIONS");
    //Cho phép các header, nếu client dùng form data để gửi dữ liệu thì không cần
    header("Access-Control-Allow-Headers: Content-Type"); 
    require_once("../model/connect.php");
    $conn = connectdb();
    $user_id = $_GET["user_id"] ?? "";
    //Lấy tất cả sản phẩm trong đơn hàng của 1 user
    if($user_id){
        $sql = "SELECT 
    p.name, 
    p.image_url, 
    p.price, 
    ot.order_item_id,
    ot.quantity,
    p.price * ot.quantity AS total
FROM 
    orders o 
INNER JOIN 
    order_items ot ON o.order_id = ot.order_id
INNER JOIN 
    products p ON ot.product_id = p.product_id 
WHERE 
    o.user_id = ?";
    $stmt = $conn -> prepare($sql);
    $stmt -> execute([$user_id]);
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode($cartItems);
    }
    //Xử lý yêu cầu preflight
    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
        http_response_code(200);
        exit(0); 
    }
    //Thêm 1 sản phẩm vào giỏ hàng
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $user_id = $_POST["user_id"] ?? "";
        $product_id = $_POST["product_id"] ?? "";
        $product_name = $_POST["product_name"] ?? "";
        $product_image = $_POST["product_image"] ?? "";
        $product_price = $_POST["product_price"] ?? "";
        $quantity = $_POST["quantity"] ?? "";
        $total_amount = $product_price * $quantity;
        $sql = "SELECT * FROM orders WHERE user_id = ? AND status = ?";
        $stmt = $conn -> prepare($sql);
        $stmt -> execute([$user_id, "Cart"]);
        //Nếu người dùng chưa có đơn hàng
        $orderInDatabase = $stmt -> fetch();
        if(!$orderInDatabase){
            //Thêm mới đơn hàng
            $sql1 = "INSERT INTO orders(user_id, status, total_amount) VALUES(?,?,?)";
            $stmt = $conn ->prepare($sql1);
            $stmt -> execute([$user_id, "Cart", $total_amount]);
            $current_order_id = $conn->lastInsertId();//Lấy order_id vừa mới thêm
            //Thêm mới chi tiết đơn hàng
            $sql2 = "INSERT INTO order_items(order_id, product_id, quantity, price) VALUES(?,?,?,?)";
            $stmt = $conn -> prepare($sql2);
            $stmt -> execute([$current_order_id, $product_id, $quantity, $product_price]);
            http_response_code(200);
            echo json_encode("Thêm mới".$product_name."vào giỏ hàng thành công");
        }
        //Nếu người dùng đã có đơn hàng
        else{
            $current_order_id = $orderInDatabase["order_id"];//Lấy order_id trong database;
            $sql3 = "SELECT * FROM order_items WHERE order_id = ? AND product_id = ?";
            $stmt = $conn -> prepare($sql3);
            $stmt -> execute([$current_order_id, $product_id]);
            $productInOrderItem = $stmt->fetch();
            //Nếu chưa có sản phẩm trong chi tiết đơn hàng thì thêm mới sản phẩm vào chi tiết đơn hàng
            //và cập nhật tổng tiền cho đơn hàng
            if(!$productInOrderItem){
                $sql4 = "INSERT INTO order_items(order_id, product_id, quantity, price) VALUES(?,?,?,?)";
                $stmt = $conn -> prepare($sql4);
                $stmt -> execute([$current_order_id, $product_id, $quantity, $product_price]);
                //Kích hoạt Trigger cập nhật lại tổng tiền đơn hàng sau khi thêm 1 sản phẩm vào giỏ hàng
                http_response_code(200);
                echo json_encode("Thêm mới".$product_name."vào giỏ hàng thành công");
            }
            //Có rồi thì cập nhật số lượng cho chi tiết đơn hàng và cập nhật tổng tiền cho đơn hàng
            else{
                $sql6 = "UPDATE order_items SET quantity = quantity + ? WHERE order_id = ? AND product_id = ? ";
                $stmt = $conn -> prepare($sql6);
                $stmt -> execute([$quantity, $current_order_id, $product_id]);
                 //Kích hoạt Trigger cập nhật lại tổng tiền đơn hàng sau khi cập nhật số lượng 1 sản phẩm
                http_response_code(200);
                echo json_encode("Bạn đã thêm số lượng cho".$product_name);
            }
        }
    } 
    //Cập nhật số lượng 1 sản phẩm
    if($_SERVER["REQUEST_METHOD"] === "PUT"){
        $id = $_GET["id"] ?? "";
        if($id){   
            $input = file_get_contents("php://input");
            $data = json_decode($input, true);
            $newQuantity = $data["newQuantity"] ?? "";
            $sql = "UPDATE order_items SET quantity = ? WHERE order_item_id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$newQuantity, $id]);
            $row = $stmt->rowCount();
            if($row > 0){
                 //Kích hoạt Trigger cập nhật lại tổng tiền đơn hàng sau khi cập nhật số lượng 1 sản phẩm
                http_response_code(200);
                echo json_encode(["message" => "Tăng số lượng sản phẩm lên 1"]);
            }
            else{
                http_response_code(500);
                echo json_encode(["message" => "Cập nhật số lượng sản phẩm thất bại"]);
            }
        }
    }
    //Xóa 1 sản phẩm
    $id = $_GET["id"] ?? "";
    if($_SERVER["REQUEST_METHOD"] === "DELETE" && $id){
        $sql = "DELETE FROM order_items WHERE order_item_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id]);
        $row = $stmt->rowCount();
        if($row > 0){
            //Kích hoạt Trigger cập nhật lại tổng tiền đơn hàng sau khi xóa 1 sản phẩm ra khỏi giỏ hàng
            http_response_code(200);
            echo json_encode(["message" => "Đã xóa thành công 1 sản phẩm ra khỏi giỏ hàng"]);
        }
        else{
            http_response_code(200);
            echo json_encode(["message" => "Xóa thất bại"]);
        }
    }
    //Xóa nhiều sản phẩm
    else if($_SERVER["REQUEST_METHOD"] === "DELETE"){
        $input = file_get_contents("php://input");
        $data = json_decode($input, true);
        $arrId = $data['arrId'] ?? [];
        $arrIdString = implode(",", $arrId);//Tách mảng thành chuỗi
        $sql = "DELETE FROM order_items WHERE order_item_id IN ($arrIdString)";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $row = $stmt->rowCount();
        if($row > 0){
            //Kích hoạt Trigger cập nhật lại tổng tiền đơn hàng sau khi xóa nhiều sản phẩm ra khỏi giỏ hàng
            http_response_code(200);
            echo json_encode(["message" => "Đã xóa".$row."sản phẩm ra khỏi giỏ hàng thành công"]);
        }
        else{
            http_response_code(200);
            echo json_encode(["message" => "Xóa thất bại"]);
        }
    }
    
    $conn = null;
 ?>