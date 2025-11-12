<pre><?php
$a = array(1, -3, 5); //mảng có 3 phần tử
$b = array("a"=>2, "b"=>4, "c"=>-6);//mảng có 3 phần tử.Các index của mảng là chuỗi
?>
Nội dung giá trị mảng a :
<?php
foreach($a as $value)//Duyệt qua từng phần tử của mảng $a
{
	echo $value ." ";//Kết quả Nội dung giá trị mảng a: 1 -3 5	
}
?>
<br> Nôi dung mảng a (key-value)
<?php
foreach($a as $key=>$value)
{
	echo "($key - $value )";//Kết quả Nội dung mảng a (0-1) (1- -3) (2-5)	
}
?>
<br /> Nội dung mảng b: (key - value):
<?php
foreach($b as $k=>$v)//Duyệt qua từng phần tử của mảng $b
{
	echo "($k - $v) ";//Kết quả Nội dung giá trị mảng b: ("a"- 2) ("b" - 4) ("c" - -6)
}	
?>
<br />Hiển thị nội dung mảng b ra dạng bảng:
<table border=1>
	<!-- Hàng 1 cột 1 là STT, cột 2 là Key(index), cột 3 là value -->
	<tr><td>STT</td><td>Key</td><td>Value</td></tr>
    <?php
	$i=0;
	foreach($b as $k=>$v)//Duyệt từng phần tử của mảng $b
	{	$i++;
		echo "<tr><td>$i</td>";
		echo "<td>$k</td>";
		echo "<td>$v</td></tr>";
	}
	?>
	
</table>
<?php
// Đếm số phần tử giá trị dương của mảng $a
function DemGiaTriDuong($arr){
	$dem = 0;
	foreach($arr as $v){//Duyệt qua từng phần tử của mảng $a
		if($v > 0)//$v = 1, $v= 5
			$dem++;//$dem = 2
	}
	echo "Các phần tử giá trị dương của mảng là:".$dem;
}
DemGiaTriDuong($a);
$c = array();//Khai báo mảng $c giá trị rỗng
foreach($b as $v){//Duyệt từng phần tử của mảng $b
	if($v > 0)//Nếu phần tử nào giá trị dương thì thêm vào mảng $c
		$c[] = $v;
}
echo "<br> Các phần tử trong mảng c là:";
print_r($c);//Kết quả xuất ra mảng $c gồm 2 phần tử(2,4)
 ?>