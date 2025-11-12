<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Lab5_2</title>
</head>

<body>
<?php
echo "REQUEST:";
print_r($_REQUEST);//Mảng $_REQUEST hiển thị dữ liệu sau khi 
//click vào 4 link bên dưới hoặc submit form 
echo "<hr>POST<br>";//Mảng $_POST chỉ nhận dữ liệu sau khi subit form method POST
print_r($_POST);
$x = $_POST["x"] ?? "";//Nếu tồn tại $_POST["x"] thì gán $x = $_POST["x"] ngược lại gán $x bằng rỗng
$y = $_POST["y"] ?? "";//Nếu tồn tại $_POST["y"] thì gán $y = $_POST["y"] ngược lại gán $y bằng rỗng
$z = $_POST["z"] ?? "";//Nếu tồn tại $_POST["z"] thì gán $z = $_POST["z"] ngược lại gán $z bằng rỗng
$x1 = $_POST["x1"] ?? array();//Nếu tồn tại mảng $_POST["x1"] thì gán $x1 = mảng $_POST["x1"] ngược lại gán $x1 bằng mảng rỗng
$X1 = $x1[0] ?? "";//Nếu có giá trị $x1[0] trong mảng $x1 thì gán $X1 = $x1[0] ngược lại gán $X1 bằng rỗng
$X2 = $x1[1] ?? "";//Nếu có giá trị $x1[1] trong mảng $x1 thì gán $X2 = $x1[1] ngược lại gán $X2 bằng rỗng
$y1 = $_POST["y1"] ?? "";//Nếu tồn tại $_POST["y1"] thì gán $y1 = $_POST["y1"] ngược lại gán $y1 bằng rỗng
$name = $_POST["name"] ?? "";//Nếu tồn tại $_POST["name"] thì gán $name = $_POST["name"] ngược lại gán $name bằng rỗng
?><hr>
<!-- Khi click vào Link 1 url sẽ hiển thị localhost:3000/lab5_1.php?x=1&y=2&z=3 -->
<a href="lab5_2.php?x=1&y=2&z=3">Link 1</a><br>
<!-- Khi click vào Link 2 url sẽ hiển thị localhost:3000/lab5_1.php?x[]=1&x[]=2&y=3 -->
<a href="lab5_2.php?x[]=1&x[]=2&y=3">Link 2</a><br>
<!-- Khi click vào Link 3 url sẽ hiển thị localhost:3000/lab5_1.php?mod=product&ac=detail&id=1 -->
<a href="lab5_2.php?mod=product&ac=detail&id=1">Link 3</a><br>
<!-- Khi click vào Link 4 url sẽ hiển thị localhost:3000/lab5_1.php?mod=product&ac=list&name=a&page=2 -->
<a href="lab5_2.php?mod=product&ac=list&name=a&page=2">Link 4</a><br>
<hr>
<fieldset>
<legend>Form 1</legend>
<form action="lab5_2.php" method="post">
<!-- Khi bấm submit mảng $_REQUEST và $_POST sẽ nhận giá trị x=1, y=2, z=3 -->
Nhập x:<input type="text" name="x" value=<?php echo $x ?>><br>
Nhập y:<input type="text" name="y" value=<?php echo $y ?>><br>
Nhập z:<input type="text" name="z" value=<?php echo $z ?>><br>
<input type="submit" >
</form>
</fieldset>

<fieldset>
<legend>Form 2</legend>
<form action="lab5_2.php" method="post">
<!-- Khi bấm submit mảng $_REQUEST và $_POST sẽ nhận giá trị x[0]=1, x[1]=2, z=3 -->
Nhập x1:<input type="text" name="x1[]" value=<?php echo $X1?>><br>
Nhập x2:<input type="text" name="x1[]" value=<?php echo $X2?>><br>
Nhập y:<input type="text" name="y1" value=<?php echo $y1 ?>><br>
<input type="submit" >
</form>
</fieldset>

<fieldset>
<legend>Form 3</legend>
<form action="lab5_2.php" method="post">
<!-- Nhập tên chung, giới tính Nam, sở thích thể thao 
 sau đó bấm submit mảng $_REQUEST và $POST sẽ nhận giá trị ten=chung, gt=1, st[0]=tt  -->
Nhập tên:<input type="text" name="name" value=<?php echo $name ?>><br>
giới tính:<input type="radio" name="gt" value="0">Nam
		  <input type="radio" name="gt" value="1">Nữ<br>
Sở Thích:<input type="checkbox" name="st[]" value="0">Thể Thao
		<input type="checkbox" name="st[]" value="1">Du Lịch
		<input type="checkbox" name="st[]" value="2">Game<br>
<input type="submit" >
</form>
</fieldset>
</body>
</html>