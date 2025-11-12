<?php
    function kiemTraChuoiDoiXung($s){
        for($i=0; $i< strlen($s)/2; $i++ ){
            if($s[$i] !== $s[strlen($s) -$i -1])
                return false;
        }
        return true;
    };
    if(kiemTraChuoiDoiXung("abcba"))
        echo "Là chuỗi đối xứng";
    else
        echo "Không phải là chuỗi đối xứng";
   
 ?>