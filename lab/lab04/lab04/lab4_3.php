<?php
function showArray($arr)//Khai báo hàm showArray
{
	foreach($arr as $k=>$v)//Duyệt qua từng phần tử trong mảng $arr
	{
		echo "<br> $k - $v ";	
	}	
}
$a = array(6, 2, 7, 8, 5); //Khai báo mảng $a
$b = array("a"=>4, "b"=>2, "c"=>3, "d"=>8);//Khai báo mảng $b
$n = array_rand($a);//Lấy ngẫu nhiên 1 phần tử trong mảng $a bao gồm key và value
echo "Phần tử ngẫu nhiên: key=$n , giá trị=".$a[$n];
$c = array_rand($a, 3);//Khai báo mảng $c bằng danh sách 
//ngẫu nhiên 3 phần tử trong mảng $a bao gồm key và value
echo "<br> Danh sách 3 phần tử ngẫu nhiên được lấy ra:";
foreach($c as $k)//Duyệt qua từng phần tử của mảng $c
{
	echo "(key=$k -	value={$a[$k]})";
}

$m=3;//Khai báo biến $m = 3
$c = array_rand($b, $m);//Khai báo mảng $c bằng danh sách 
//ngẫu nhiên $m(3) phần tử trong mảng $b bao gồm key và value
echo "<br> Danh sách $m phần tử ngẫu nhiên được lấy ra từ b:";
foreach($c as $k)
{
	echo "(key=$k -	value={$b[$k]})";
}
?><hr />
<?php
$a1= $a; //Khai báo mảng $a1 = $a
sort($a1);//Sắp xếp mảng $a1
echo "Mảng a sau khi sắp xếp:";
showArray($a);//Gọi hàm showArray để hiện thị kết quả
$b1 = $b; //Khai báo mảng $b1 = $b
sort($b1);//Sắp xếp mảng $b1 và loại bỏ key
echo "<br>Mảng b sau khi sắp xếp loại bỏ key:";
showArray($b1);//Gọi hàm showArray để hiện thị kết quả

$b2 = $b;//Khai báo mảng $b2 = $b
asort($b2);//Sắp xếp mảng $b2 và giữ lại key
echo "<br>Mảng b sau khi sắp xếp giữ lại key:";
showArray($b2);//Gọi hàm showArray để hiện thị kết quả

echo "<hr> Tính tổng ";
$sum_a = array_sum($a);//Khai báo biến $sum_a bằng tổng các phần tử trong mảng $a
//Kết quả: 6 + 2 + 7 + 8 + 5 = 28
$sum_b = array_sum($b);//Khai báo biến $sum_b bằng tổng các phần tử trong mảng $a
//Kết quả: 2 + 3 + 4 + 8 = 17
echo "<br> Tổng các giá trị trong mảng a = $sum_a , mảng b= $sum_b ";
//Sắp xếp mảng giảm dần
usort($a, function($a, $b){//Hàm usort để sắp xếp theo cách người dùng tự định nghĩa
	//Tham số thứ nhất là giá trị truyền vào(mảng), tham số thứ 2 là hàm callback chứa 2 giá trị trong mảng
	return $b - $a;
});
echo "<br> Mảng a sau khi sắp xếp giảm dần:";
print_r($a);//Kết quả sẽ in ra mảng $a giá trị giảm dần(8,7,6,5,2)
usort($b, function($a, $b){//Hàm usort để sắp xếp theo cách người dùng tự định nghĩa
	//Tham số thứ nhất là giá trị truyền vào(mảng), tham số thứ 2 là hàm callback chứa 2 giá trị trong mảng
	return $b - $a;
});
echo "<br> Mảng b sau khi sắp xếp giảm dần:";
print_r($b);//Kết quả sẽ in ra mảng $a giá trị giảm dần(8,4,3,2)
?>


