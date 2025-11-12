<pre><?php
$a = array();//mảng rỗng
$b = array(1, 3, 5); //mảng có 3 phần tử
/*
$b[0] = 1;
$b[1] = 3;
$b[2] = 5;
*/
$c = array("a"=>2, "b"=>4, "c"=>6);//mảng có 3 phần tử.Các index của mảng là chuỗi
/*
$c['a']= 2;
$c['b'] = 4;
$c['c'] = 6
*/

$na = Count($a);//Đếm số phần tử có trong mảng $a => $na = 0
$nb = Count($b);//Đếm số phần tử có trong mảng $b => $nb = 3
$nc = Count($c);//Đếm số phần tử có trong mảng $c => $nc = 3
echo "Mảng a có $na phần tử <br> ";//Kết quả: Mảng a có 0 phần tử
echo "Mảng b có $nb phần tử <br> ";//Kết quả: Mảng a có 3 phần tử
echo "Mảng c có $nc phần tử <br> ";//Kết quả: Mảng a có 3 phần tử
print_r($a);//Kết quả xuất ra mảng rỗng
var_dump($b);//Kết quả xuất ra mảng $b có 3 phần tử(1,3,5)
print_r($c);//Kết quả xuất ra mảng $c có 3 phần tử(2,4,6)
$a[] = 3;//Thêm phần tử 3 vào mảng $a
$b[] = 7;//Thêm phần tử 7 vào mảng $b
$c['d'] = 8;//Thêm phần tử 8 vào mảng $c với index = "d"
echo "<hr> Sau khi thêm phần tử, nội dung các mảng  là :";
print_r($a);//Kết quả xuất ra mảng $a có 1 phần tử(3)
print_r($b);//Kết quả xuất ra mảng $b có 4 phần tử(1,3,5,7)
print_r($c);//Kết quả xuất ra mảng $c có 4 phần tử(2,4,6,8)

$x = 1;//Khai báo biến $x = 1
unset($a[$x]);//Xóa phần tử tại vị trí $x trong mảng $a => Không có giá trị để xóa
unset($b[$x]);//Xóa phần tử tại vị trí $x trong mảng $b => Xóa phần tử 3
unset($c['a']);//Xóa phần tử tại vị trí "a" trong mảng $c => Xóa phần tử 2
echo "<hr> Sau khi xóa phần tử, nội dung các mảng  là :";
print_r($a);//Kết quả xuất ra mảng $a có 1 phần tử(3)
print_r($b);//Kết quả xuất ra mảng $b có 3 phần tử(1,5,7)
print_r($c);//Kết quả xuất ra mảng $c có 3 phần tử(4,6,8)

$value = 2;//Khai báo biến $value = 2
$key = 'b';//Khai báo biến $key = "b"
if (isset($c[$key])) unset($c[$key]);//Nếu tồn tại giá trị mảng $c 
//tại vị trí $key("b) thì xóa phần tử $c["b"] 
//Có tồn tại => Xóa phần tử $c["b] => Xóa 4
else $c[$key] = $value;//Nếu không tồn tại thì gán $c["b"] = 2
echo "<hr> Kết quả mảng c là:";
print_r($c);//Kết quả xuất ra mảng $c(6,8)

?>