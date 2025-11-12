<?php
function postIndex($index, $value="")
{
	if (!isset($_POST[$index]))	return $value;//Nếu tồn tại $_POST[$index] trong mảng $_POST 
	//thì trả về giá trị của $_POST[$index]
	return $_POST[$index];
}

$sm 	= postIndex("submit");//Nếu tồn tại $_POST["submit"] thì gán $sm="submit";
$ten 	= postIndex("ten");//Nếu tồn tại $_POST["ten"] thì gán $ten= giá trị nhập bên form của file 1.php;
$gt 	= postIndex("gt");//Nếu tồn tại $_POST["gt"] thì gán $gt= 1 nếu bên form chọn Nam, $gt = 0 nếu bên form chọn Nữ;
$arrImg = array("image/png", "image/jpeg", "image/bmp");//Khai báo mảng $arrImg

if ($sm=="") {
				header("location:1.php"); exit;//quay ve 1.php
			}//Nếu $sm="" thì chuyển hướng về file 1.php(ngăn không cho truy cập file 2.php trực tiếp bằng đường dẫn)

$err = "";//Khai báo biến $err rỗng
if ($ten=="") $err .="Phải nhập tên <br>";//Nếu chưa nhập tên thì thông báo lỗi
if ($gt=="") $err .="Phải chọn giới tính <br>";//Nếu chưa chọn giới tính thì thông báo lỗi

if (isset($_FILES["hinh"])) { // Kiểm tra xem người dùng có upload file "hinh" hay không
	$total = count($_FILES["hinh"]["name"]); // Đếm tổng số file được chọn để upload

    for ($i = 0; $i < $total; $i++) { // Lặp qua từng file một
        $errFile = $_FILES["hinh"]["error"][$i]; // Lấy mã lỗi của file thứ i

        if ($errFile > 0) { // Nếu có lỗi khi upload (ví dụ: chưa chọn file, file quá lớn,...)
            $err .= "Lỗi file hình " . ($_FILES["hinh"]["name"][$i]) . "<br>"; // Ghi lỗi vào biến $err
        } else { // Nếu không có lỗi upload
            $type = $_FILES["hinh"]["type"][$i]; // Lấy kiểu MIME (ví dụ: image/jpeg, image/png, ...)

            if (!in_array($type, $arrImg)) { // Kiểm tra kiểu file có nằm trong danh sách hợp lệ không
                $err .= "Không phải file hình: " . ($_FILES["hinh"]["name"][$i]) . "<br>"; // Báo lỗi nếu không đúng định dạng
            } else { // Nếu đúng là file hình
                $temp = $_FILES["hinh"]["tmp_name"][$i]; // Đường dẫn file tạm do PHP lưu trên server
                $name = basename($_FILES["hinh"]["name"][$i]); // Lấy tên file gốc (loại bỏ đường dẫn)

                // Di chuyển file từ thư mục tạm sang thư mục "image/"
                if (!move_uploaded_file($temp, "image/" . $name))
                    $err .= "Không thể lưu file: " . $name . "<br>"; // Báo lỗi nếu không lưu được
            }
		}
	}   
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Lab5_3/2</title>
</head>
<body>
<?php
if ($err !="")//Nếu có lỗi thì xuất ra thông báo lỗi
  echo $err;
else
{
	if($gt =="1") echo "Chào Anh: $ten ";//Nếu chọn Nam thì xuất ra Chào Anh: giá trị của biến $ten
	else echo "Chào Chị $ten ";//Nếu chọn Nữ thì xuất ra Chào Chị: giá trị của biến $ten
	?><hr>
	<!-- Source của img là đường dẫn chứa file upload -->
    <img src="image/<?php echo $name;?>">
    <?php	
}
?>
<p>
<!-- Bấm tiếp tục sẽ quay về file 1.php -->
<a href="1.php">Tiếp tục</a>
</p>
</body>
</html>