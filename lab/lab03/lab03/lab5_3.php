<?php
    function tinhTongChuSoTrongChuoi($chuoi){
        $s=0;
        for($i=0;$i<strlen($chuoi);$i++){
            if(is_numeric($chuoi[$i]))
                $s+=$chuoi[$i];
        }
        echo "Tong cac chu so trong chuoi là:".$s;
    }
    tinhTongChuSoTrongChuoi("ngay17thang5nam2015");
 ?>