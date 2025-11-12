<?php
    function xuatHinhChuNhatRong($d, $r){
        for($i=0; $i<$d; $i++){
            for($j=0; $j<$r; $j++){
             if($i == 0 || $i == $d - 1 || $j == 0 || $j == $r -1)
                echo "*";
            else
                echo "&nbsp;&nbsp;";
            }
            echo "</br>";
        }
    }
    xuatHinhChuNhatRong(6, 10);
 ?>