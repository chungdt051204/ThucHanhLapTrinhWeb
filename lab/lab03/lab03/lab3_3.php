<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Lab 3_3</title>
</head>

<body>
<?php
	$a=10;//a ban đầu bằng 10
	function f()
	{
		global $a;// global dùng để khai báo biến toàn cục
		$b=20;
		$a = $a+$b;// a = 10 + 20 = 30
	}
	f();
	echo $a;//Kết quả a = 30, nếu không có biến global thì a = 10
?>
</body>
</html>