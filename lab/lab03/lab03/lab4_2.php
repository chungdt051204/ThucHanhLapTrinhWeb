<?php
$n = 1;
$tong = 0;
while ($tong <= 1000) {
    $tong += $n;
    $n++;
}
echo "n nhỏ nhất sao cho 1 + 2 + ... + n > 1000 là: " . ($n - 1);
?>
