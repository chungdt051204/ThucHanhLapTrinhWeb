<?php
    header("Access-Control-Allow-Origin: http://localhost:5173"); 
    require_once("../model/connect.php");
    $conn = connectdb();
    //Đếm tổng sản phẩm
    $sql = "SELECT COUNT(*) as tongSanPham FROM products";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $tongSanPham = $stmt->fetch(PDO::FETCH_ASSOC);
    //Đếm tổng số người dùng
    $sql = "SELECT COUNT(*) as tongNguoiDung FROM users WHERE role = 'user'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $tongNguoiDung = $stmt->fetch(PDO::FETCH_ASSOC);
    //Đếm tổng số đơn hàng
    $sql = "SELECT COUNT(*) as tongDonHang FROM `order`";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $tongDonHang = $stmt->fetch(PDO::FETCH_ASSOC);
    //Đếm tổng doanh thu
    $sql = "SELECT SUM(total_amount) as tong FROM `order` WHERE status = 'COMPLETED'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $tongDoanhThu = $stmt->fetch(PDO::FETCH_ASSOC);
     //Thống kê doanh thu theo ngày
    $sql = "SELECT SUM(total_amount) as tong, DATE(updated_at) ngay FROM `order` WHERE status = 'COMPLETED' GROUP BY DATE(updated_at)
    ORDER BY DATE(updated_at) asc";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $tongDoanhThuMotNgay = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //Top 5 sản phẩm bán chạy
    $sql = "SELECT p.product_id, p.name, SUM(oi.quantity) as soLuongBanDuoc FROM order_item oi JOIN products p ON oi.product_id = p.product_id GROUP BY p.product_id, p.name ORDER BY SUM(oi.quantity) desc LIMIT 5";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $sanPhamBanChay = $stmt->fetchAll(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode(["data" => $tongSanPham, "data1" => $tongNguoiDung, "data2" => $tongDonHang, "data3" => $tongDoanhThu, "data4" => $tongDoanhThuMotNgay, "data5" => $sanPhamBanChay]);
    $conn = null;
 ?>