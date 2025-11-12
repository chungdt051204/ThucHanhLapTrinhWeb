<?php
function laSoNguyenTo($n) {
    if ($n < 2) return false;
    for ($i = 2; $i <= sqrt($n); $i++) {
        if ($n % $i == 0) return false;
    }
    return true;
}
function xuatNSoNguyenToDauTien($n) {
    $dem = 0;
    $so = 2;
    while ($dem < $n) {
        if (laSoNguyenTo($so)) {
            echo $so . " ";
            $dem++;
        }
        $so++;
    }
}
// Gọi hàm — ví dụ: in 10 số nguyên tố đầu tiên
xuatNSoNguyenToDauTien(10);
?>
