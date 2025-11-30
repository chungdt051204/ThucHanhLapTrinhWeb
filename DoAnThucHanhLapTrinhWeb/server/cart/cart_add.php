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
                $sql5 = "UPDATE orders SET total_amount = (
                    SELECT SUM(ot.price * ot.quantity) 
                    FROM order_items ot 
                    WHERE ot.order_id = ?
                 ) 
                 WHERE order_id = ?";
                $stmt = $conn -> prepare($sql5); 
                $stmt -> execute([$current_order_id, $current_order_id]);
                http_response_code(200);
                echo json_encode("Thêm mới".$product_name."vào giỏ hàng thành công");
            }
            //Có rồi thì cập nhật số lượng cho chi tiết đơn hàng và cập nhật tổng tiền cho đơn hàng
            else{
                $sql6 = "UPDATE order_items SET quantity = quantity + ? WHERE order_id = ? AND product_id = ? ";
                $stmt = $conn -> prepare($sql6);
                $stmt -> execute([$quantity, $current_order_id, $product_id]);
                $sql7 = "UPDATE orders SET total_amount = (
                    SELECT SUM(ot.price * ot.quantity) 
                    FROM order_items ot 
                    WHERE ot.order_id = ?
                 ) 
                 WHERE order_id = ?";
                $stmt = $conn -> prepare($sql7); 
                $stmt -> execute([$current_order_id, $current_order_id]);
                http_response_code(200);
                echo json_encode("Bạn đã thêm số lượng cho".$product_name);
            }
        }
    } 
    $conn = null;
 ?>