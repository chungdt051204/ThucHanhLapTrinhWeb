<?php
function BCC($n, $colorHead, $color1, $color2)
{
	?>
	<table>
	<tr bgcolor="<?php echo $colorHead; ?>"><td colspan="4">Bảng cửu chương <?php echo $n;?></td></tr>
	<!-- Cột ở hàng đầu tiên có kích thước bằng 4 cột gộp lại -->
	<?php
		for($i=1; $i<=10; $i++)
		{
			$color = $i%2 ? $color1 : $color2;
			?>
			<tr bgcolor="<?php echo $color ?>"><td><?php echo $n;?></td>
				<td><?php echo "x";?></td>
				<td><?php echo $i;?></td>
				<td><?php echo $n*$i;?></td>
			</tr>
			<?php
		}
		?>
		</table>
	<?php	
}
Bcc(6, "green", "gray", "black");	// In ra bảng cửu chương 6, dòng đầu tiên nền màu xanh lá
//Dòng chẳn nền xám, dòng lẻ nền đen
function BanCo($size =8)//Bàn cờ có 8 cột và 8 hàng
{
	?>
	<div id="banco">
		<?php
		for($i=1; $i<= $size; $i++)
		{
			for($j=1; $j<= $size; $j++)
			{
				$classCss = (($i+$j) %2)==0?"cellWhite":"cellBlack";//Nếu i + j là số chẵn thì nền trắng, là số lẻ thì nền đen
				echo "<div class='$classCss'> $i - $j</div>";
				
			}
			echo "<div class='clear' />";//Không có gì thì không hiển thị
			
		}
	?>
	</div>
	<?php

}
Banco();//In ra bàn cờ có kish thước 8 hàng, 8 cột
 ?>