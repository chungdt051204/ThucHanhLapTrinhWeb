<div class="boxleft">
<div class="headerBoxLeft">
Loại sách
</div>
<?php
$loai = array();//Khai báo mảng $loai rỗng
$r = array("maloai"=>"th", "tenloai"=>"Tin Học");
$loai[] = $r;//Thêm phần tử đầu tiên vào mảng
$r = array("maloai"=>"to", "tenloai"=>"Toán Học");
$loai[] = $r;//Thêm phần tử thứ hai vào mảng
$r = array("maloai"=>"td", "tenloai"=>"Từ Điển");
$loai[] = $r;//Thêm phần tử thứ ba vào mảng

foreach($loai as $row)//Duyệt mảng $loai
{
		?>
        <div >
        	<a href="index.php?mod=product&ac=catalog&idcat=<?php echo $row["maloai"];?>">
			<?php echo $row["tenloai"];?></a>
        </div>
        <?php
}

?>
</div>

<?php


?>
<div class="boxleft">
<div class="headerBoxLeft">
Nhà xuất bản
</div>
<?php
$nhaxb = array();//Khai báo mảng $nhãb rỗng
$r = array("manxb"=>"gd", "tennxb"=>"Giáo Dục");
$nhaxb[] = $r;//Thêm phần tử đầu tiên vào mảng
$r = array("manxb"=>"hcm", "tennxb"=>"TP. Hồ Chí Minh");
$nhaxb[] = $r;//Thêm phần tử thứ 2 vào mảng
$r = array("manxb"=>"tn", "tennxb"=>"Thanh Niên");
$nhaxb[] = $r;//Thêm phần tử thứ 3 vào mảng
$r = array("manxb"=>"dhqg", "tennxb"=>"Đại Học Quốc Gia");
$nhaxb[] = $r;//Thêm phần tử thứ 4 vào mảng
$r = array("manxb"=>"vhxh", "tennxb"=>"Văn Hóa xã hội");
$nhaxb[] = $r;

foreach($nhaxb as $row)//Duyệt mảng $nhãb
{
		?>
        <div >
        	<a href="index.php?mod=product&ac=press&idpress=<?php echo $row["manxb"];?>"><?php echo $row["tennxb"];?></a>
        </div>
        <?php
}
?>
</div>