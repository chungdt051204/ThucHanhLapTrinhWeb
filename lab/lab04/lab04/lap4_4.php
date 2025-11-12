<pre><?php
$a = array(1, 3, 5);//Khai báo mảng $a gồm 3 phần tử(1,3,5)
$b = array("x1"=>2, "x2"=>4);//Khai báo mảng $b gồm 2 phần tử(2 ở vị trí "x1", 4 ở vị trí "x2")

$c = array($a, $b);//Khai báo mảng $c gồm 2 phần tử, phần tử 0 là măng $a, phần tử 1 là mảng $b
//$c = [[1, 3, 5], [2, 4]]
$d = array();//Khai báo mảng rỗng $d
$d[] = $a;//Thêm mảng $a vào mảng $d
$d[] = $b;//Thêm mảng $b vào mảng $d sau mảng $a
print_r($c);//Kết quả xuất ra mảng 2 chiều $c với phần tử 0 là mảng $a và phần tử 1 là mảng $b
print_r($d);//Kết quả xuất ra mảng 2 chiều $d với phần tử 0 là mảng $a và phần tử 1 là mảng $b
$v = $d[1]["x2"];//$v=4

?>