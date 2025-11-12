<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Lab 3_2</title>
</head>

<body>
<?php

function cong($a,$b)
{
	return $a+$b;
}

function swap(&$a,&$b)
{
	$t=$a;//$t = 1
	$a=$b;//$a = 2
	$b=$t;//$b = 1
}
$x=1;
$y=2;
swap($x,$y);//&$a sẽ được gán bằng $x, &$b sẽ được gán bằng $y
echo "x=$x; y=$y";//Kết quả x=2; y=1
?>
</body>
</html>