<?php
if (!defined("ROOT"))
{
	echo "You don't have permission to access this page!"; exit;	
}
$path =ROOT."/module/info/trangchu.php";//mac dinh
	$mod = isset($_GET["mod"])?$_GET["mod"]:"";//Nếu tồn tại $_GET["mod"] thì gán $mod=$_GET["mod"]
	$ac = isset($_GET["ac"])?$_GET["ac"]:"";//Nếu tồn tại $_GET["ac"] thì gán $ac=$_GET["ac"]
	if($mod=="info")
	{
		include ROOT."/module/info/index.php";//Nạp file index.php từ /module/info
	}
	if ($mod=="product")
	{
		include ROOT."/module/product/index.php";//Nạp file index.php từ /module/product
		
	}
	if ($mod=="news")
	{
		
	}
	if ($mod=="cart")
	{
		
	}
	if ($mod=="search")
		{
				$path =ROOT."/module/product/search.php";
		}
	include $path;//Nạp file search.php từ /module/product

?>