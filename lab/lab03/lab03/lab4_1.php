<?php
    function tinhTongChanTu2Den100(){
        $s = 0;
        for($i=2; $i<=100; $i++ ){
            if($i%2==0)
                $s += $i;
        }
        echo "Tổng các số chẳn từ 2 đến 100 là:".$s;
    }
    tinhTongChanTu2Den100();
 ?>