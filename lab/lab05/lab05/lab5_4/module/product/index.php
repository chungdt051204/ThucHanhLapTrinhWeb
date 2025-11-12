<?php
if (!defined("ROOT"))
{
	echo "You don't have permission to access this page!"; exit;	
}
if ($ac=="spbc") 
	include ROOT."/module/product/spbc.php";//Nạp file spbc.php
if ($ac=="spmoi") 
	$path =ROOT."/module/product/spmoi.php";//Nạp file spmoi.php
if ($ac=="catalog")
	 {
	$path =ROOT."/module/product/product_catalog.php";//Nạp file product_catalog.php
	 }
if ($ac=="press")
	 {
	$path =ROOT."/module/product/product_press.php";//Nạp file product_press.php
	 }
if ($ac=="detail")
	 {
	$path =ROOT."/module/product/product_detail.php";//Nạp file product_detail.php
	 }
?>