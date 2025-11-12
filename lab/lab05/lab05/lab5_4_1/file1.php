<?php
    $arr = array();//Khai báo mảng $arr rỗng
    $r = array("id"=>1, "name"=>"Product1");
    $arr[] = $r;
    $r = array("id"=>2, "name"=>"Product2");
    $arr[] = $r;
    $r = array("id"=>3, "name"=>"Product3");
    $arr[] = $r;
    $r = array("id"=>4, "name"=>"Product4");
    $arr[] = $r;//Thêm lần lượt giá trị của mảng $r và mảng $arr
    foreach($arr as $k => $v){//Duyệt từng phần tử mảng $arr
        ?>
            <a href="./file2.php?id=<?php echo $arr[$k]["id"] ?>"><?php echo $arr[$k]["name"] ?></a><br>
        <?php
    }
 ?>