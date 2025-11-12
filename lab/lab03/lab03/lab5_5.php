<?php
function tongCacSoTrongChuoi($chuoi) {
    $tong = 0;
    $soHienTai = "";
    // Duyệt từng ký tự trong chuỗi
    for ($i = 0; $i < strlen($chuoi); $i++) {
        $kyTu = $chuoi[$i];
        // Nếu là chữ số thì cộng dồn vào số hiện tại
        if (is_numeric($kyTu)) {
            $soHienTai .= $kyTu;
        } else {
            // Nếu gặp ký tự không phải số và có số đang giữ => cộng vào tổng
            if ($soHienTai != "") {
                $tong += (int)$soHienTai;
                $soHienTai = ""; // reset
            }
        }
    }
    // Sau vòng lặp, nếu chuỗi kết thúc bằng số thì cộng nốt
    if ($soHienTai != "") {
        $tong += (int)$soHienTai;
    }
    return $tong;
}
// Ví dụ
$chuoi = "ngay15thang7nam2015";
echo "Tổng các số trong chuỗi là: " . tongCacSoTrongChuoi($chuoi);
?>
