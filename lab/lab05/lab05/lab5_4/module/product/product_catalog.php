<?php
if (!defined("ROOT"))
{
	echo "You don't have permission to access this page!"; exit;	
}

$loai = getIndex("idcat");//Lấy dữ liệu từ $_GET["idcat"]
?>
<div class="productList">
	Các sản phẩm của loại có mã: <?php echo $loai;?>
</div>
